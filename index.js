/* 
	小肥牛扫码扫码点餐项目API子系统
*/
const PORT = 8090;
const express = require('express');
const categoryRouter = require('./routes/admin/category');
const adminRouter = require('./routes/admin/admin');
const dishRouter = require('./routes/admin/dish');
const cors = require('cors');
const bodyParser = require('body-parser');


// 创建并启动HTTP应用服务器
var app = express();
app.listen(PORT,()=>{
	console.log('Server Listening:'+PORT+'...');
})

// 使用中间件
app.use(cors());
app.use(bodyParser.json());

// 挂载路由
app.use('/admin/category',categoryRouter);
app.use('/admin',adminRouter);
app.use('/admin/dish',dishRouter);