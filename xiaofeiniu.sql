SET NAMES UTF8;
DROP DATABASE IF EXISTS xiaofeiniu;
CREATE DATABASE xiaofeiniu charset=utf8;
USE xiaofeiniu;

#管理员信息表
CREATE TABLE xfn_admin(
	aid INT PRIMARY KEY AUTO_INCREMENT,
	aname VARCHAR(32) UNIQUE,
	apwd VARCHAR(64)
);

#项目全局设置
CREATE TABLE xfn_settings(
	sid	INT PRIMARY KEY AUTO_INCREMENT,
	appName	VARCHAR(32),
	apiUrl	VARCHAR(64),
	adminUrl	VARCHAR(64),
	appUrl	VARCHAR(64),
	icp	VARCHAR(64),
	copyright	VARCHAR(128)
);

#桌台信息表
CREATE TABLE xfn_table(
	tid	INT PRIMARY KEY AUTO_INCREMENT,
	tname	VARCHAR(64) null,
	type	VARCHAR(16),
	status	INT
);

#桌台预定信息表
CREATE TABLE xfn_reservation(
	rid	INT PRIMARY KEY AUTO_INCREMENT,
	contactName	VARCHAR(64),
	phone	VARCHAR(16),
	contactTime	BIGINT,
	dinnerTime	BIGINT
);

#菜品分类表
CREATE TABLE xfn_category(
	cid	INT PRIMARY KEY AUTO_INCREMENT,
	cname	VARCHAR(32)
);

#菜品信息表
CREATE TABLE xfn_dish(
	did	INT PRIMARY KEY AUTO_INCREMENT,
	title	VARCHAR(32),
	imgUrl	VARCHAR(128),
	price	DECIMAL(6,2),
	detail	VARCHAR(128),
	categoryId	INT foreign KEY
);

#订单表
CREATE TABLE xfn_order(
	oid	INT PRIMARY KEY AUTO_INCREMENT,
	startTime BIGINT,
	endTime	BIGINT,
	customerCount INT,
	tableId	INT foreign KEY
);

#订单详情表
CREATE TABLE xfn_order_detail(
	did	INT PRIMARY KEY AUTO_INCREMENT,
	dishId INT foreign KEY,
	dishCount INT,
	customerName VARCHAR(64),
	orderId	INT foreign KEY
);