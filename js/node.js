let express = require("express")();
const { time } = require("console");
const { SSL_OP_ALL } = require("constants");
const { resolveNaptr } = require("dns");
const { request, response } = require("express");
let mysql = require("mysql");
const port = 8080;

express.all("/*", function (req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); // 执行下一个路由
})

// 规划mySQL链接
let sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "shop",
    timezone: "08:00"
})
// 尝试链接
sql.connect()

// 获取来自前端路由请求
// 登录接口
express.get("/login", (request, response) => {
    // 获取来自前端的请求参数
    let username = request.query.username;
    let password = request.query.password;
    // 从数据库查询
    sql.query(`SELECT * FROM user WHERE username="${username}" AND password="${password}"`, (error, data) => {
        if (error) {
            console.log(error)
            response.send("error")
        } else {
            if (!data.length) {
                response.send("error")
            } else {
                response.send("success")
            }
        }
    })
})
// 用户注册接口
express.get("/register", (request, response) => {
    let username = request.query.username;
    let password = request.query.password;

    // 插入数据库
    sql.query(`INSERT INTO user (username,password) VALUES ("${username}","${password}")`, (error) => {
        if (error) {
            console.log(error)
            response.send("error")
        } else {
            response.send("success")
        }
    })
})
// 列表页
express.get("/goodslist", function (request, response) {
    sql.query('select * from goodslist', function (error, data) {
        if (error) {
            console.log(error);
            response.end("error");
        }
        else {
            response.send(JSON.stringify(data))
        }
    })

})

express.listen(port)
console.log("index is running at " + port)