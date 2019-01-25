/* 
	小肥牛
*/
const PORT = 8090;
const express = require('express');

// 启动
var app = express();
app.listen(PORT,()=>{
	console.log('Server Listening'+PORT+'...');
})