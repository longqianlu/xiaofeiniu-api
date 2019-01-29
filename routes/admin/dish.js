/*
	菜品相关路由
*/
const express = require('express');
const pool = require('../../pool');
var router = express.Router();
module.exports = router;


/*
	API: GET /admin/dish
	含义: 获取所有的菜品(按类别进行分类)
	返回数据:
	[
		{ cid: 1, cname: '肉类', dishList: [ {},{},... ] }
		{ cid: 2, cname: '菜类', dishList: [ {},{},... ] }
		......
	]
*/
router.get('/',(req,res)=>{
	// 查询所有的菜品类别
	pool.query('SELECT cid,cname FROM xfn_category ORDER BY cid',(err,result)=>{
		if(err) throw err;
		var categoryList = result;   //查询到所有菜品类别列表
		var count = 0 ;
		for(let c of categoryList){
			//	循环遍历每个菜品类别，查询该类别下有哪些菜品
			pool.query('SELECT * FROM xfn_dish WHERE categoryId=? ORDER BY did DESC',c.cid,(err,result)=>{
				if(err) throw err;
				c.dishList = result;
				count++;
				// 必须保证所有的类别下的菜品查询完成才能发送响应消息——这些查询都是一部执行的
				if(count==categoryList.length){
					res.send(categoryList);
				}
			})
		}
	});
})

/*
	API: POST /admin/dish/image
	请求参数:
	含义: 接收客户端上传的菜品图片，保存在服务器上，返回该图片在服务器上的随机文件名
	响应数据:
		{code:200, msg:'upload success'}
		fileName: '1321634544-8748.jpg'
*/
// 引入 multer 中间件
const multer = require('multer');
const fs = require('fs');
var upload = multer({
	dest:'tmp/'		//指定客户端上传的文件临时存储路径
});
//定义路由，使用文件上传中间件
router.post('/image',upload.single('dishImg'),(req,res)=>{
	// console.log(req.file);		// 客户端上传的图片
	// console.log(req.body);		// 客户端随同图片提交的字符数据
	//把客户端上传的文件从临时目录转移到永久的图片路径下
	var tmpFile = req.file.path;	//临时文件
	var suffix = req.file.originalname.substring(req.file.originalname.lastIndexOf('.'));		//原始文件名中的后缀部分
	var newFile = randFileName(suffix);		//目标文件名
	fs.rename(tmpFile, 'img/dish/'+newFile, ()=>{
		// 把临时文件转移到永久文件路径下
		res.send( { code:200, msg:'upload success',fileName: newFile } );
	})
})


// 生成一个随机文件名
// 参数: suffix 表示要生成的文件名中的后缀
// 形如: 1351331333-8888.jpg
function randFileName(suffix){
	var time = new Date().getTime();		// 当前系统时间戳
	var num = Math.floor(Math.random()*(10000-1000) + 1000);	//4位的随机数字
	return time + '-' + num + suffix;
}

/*
	API: POST /admin/dish
	请求参数:	{ title:'xx', imgUrl:'..jpg', price:xx, detail:'xx', categoryId:xx }
	含义: 添加一个新的菜品
	响应数据:
		{ code:200, msg:'dish added success', dishId:xx }
*/
router.post('/',(req,res)=>{
	pool.query('INSERT INTO xfn_dish SET ?',req.body,(err,result)=>{
		if(err) throw err;
		res.send( { code:200, msg:'dish added success', dishId:result.insertId } );
	});
});

/*
	API: DELETE /admin/dish/:did
	含义: 根据指定的菜品编号删除该菜品
	响应数据:
		{ code:200, msg:'dish deleted success' }
		{ code:400, msg:'dish not exists' }
*/
router.delete('/:did',(req,res)=>{
	pool.query('DELETE * FROM xfn_dish WHERE did=?')
})

/*
	API: PUT /admin/dish
	请求参数:	{ title:'xx', imgUrl:'..jpg', price:xx, detail:'xx', categoryId:xx }
	含义: 根据指定的菜品编号修改菜品
	响应数据:
		{ code:200, msg:'dish updated success' }
		{ code:400, msg:'dish not exists' }
*/