/**
 * 用户 路由 模块
 */


//引入依赖
const fs = require('fs')
const express = require("express")
const { fstat } = require("fs")
const path = require("path")
const jwt = require('jsonwebtoken');
const svgCaptcha = require("svg-captcha")
const router = express.Router()

//调用
initData()
initDataLogin()


//申明变量
let userArray = ""
let userLogin = []
let verifyCode = ""


router.get("/captcha", function(req, res) {
    var captcha = svgCaptcha.create({
        size: 6,
        ignoreChars: '0o01lIi',

        color: true

    });
    req.session.captcha = captcha.text; //官方代码中验证码

    res.type('svg');
    res.status(200).send(captcha.data)
})

router.get("/register", (req, res) => {
    res.render('register', { code: 200, msg: "" })
})
router.post("/register", (req, res) => {
    let {
        username,
        password,
        nickname,
    } = req.body
        //验证账号是否存在，不存在保错
    for (let user of userArray) {
        if (user.username === username) {
            res.render('register', { code: 501, msg: "账号被占用" })
            return
        }
    }

    //创建一个新用户对象
    let user = { username, password, nickname }

    //保存到系统中，并提示注册成功

    userArray.push(user)
    saveData()
    console.log(username, password, nickname);
    res.render('login', { code: 200, msg: "注册成功" })
})


router.get("/index", (req, res) => {
        const i = JSON.stringify(userLogin.slice(-1))
        console.log(i.slice(14, i.indexOf("\",")))
        if (userLogin.length) {
            res.render('index', { code: 200, msg: "进入页面", username: i.slice(14, i.indexOf("\",")) })
        } else {
            //如果文件存在，直接写入系统
            res.render('index', { code: 503, msg: "请登录", username: "null" })
        }
    })
    //  res.render("index", { code: 200, msg: "1" })
router.post("/index", (req, res) => {

    res.render('index', { code: 200, msg: "进入页面", username: "" })

})


router.get("/login", (req, res) => {
    //返回登录ejs网页页面
    res.render("login", { code: 200, msg: "" })
})
router.post("/login", (req, res) => {
        //接收post参数
        let { username, password, code, reg } = req.body
        if (reg === "注册") {
            res.render("register", { code: 200, msg: "跳转到注册" })
            return
        }
        if (code.toLowerCase() !== req.session.captcha.toLowerCase()) {
            res.render("login", { code: 503, msg: "验证码输入有误" })
            return
        }
        for (let user of userArray) {
            if (user.username === username && user.password === password) {
                //登录成功，记录当前登录用户
                req.session.loginUser = user
                userLogin = []
                console.log(userLogin);
                userLogin.push(user)
                saveDataLogin()
                res.render("index", { code: 200, msg: "进入页面", username: username })
                    //验证账号是否存在，不存在保错
                    /// for (let userr of userLogin) {
                    //    if (userr.username === username && userr.password === password) {
                    //   res.render('login', { code: 501, msg: "账号已经登录" })
                    //   userLogin.pop(userr)
                return
                //  }
                // }

            }

        }
        res.render("login", { code: 502, msg: "账号或密码有误" })
    })
    //使用中间件cookieSession




//初始化注册者文件
function initData() {
    fs.readFile(path.join(__dirname, "../user.json"), "utf-8", (err, data) => {
        if (err) {
            fs.writeFile(path.join(__dirname, "../user.json"), "[]", (err) => {
                console.log("文件创建完成")
            })
        } else {
            //如果文件存在，直接写入系统
            userArray = JSON.parse(data)
        }
    })
}
//初始化登录者文件
function initDataLogin() {
    fs.readFile(path.join(__dirname, "../userlogin.json"), "utf-8", (err, data) => {
        if (err) {
            fs.writeFile(path.join(__dirname, "../userlogin.json"), "[]", (err) => {
                console.log("LoginUser文件创建完成")
            })
        } else {
            //如果文件存在，直接写入系统
            userLogin = JSON.parse(data)
        }
    })
}

//保存注册者的文件
function saveData() {
    fs.writeFile(path.join(__dirname, "../user.json"), JSON.stringify(userArray), (err) => {
        console.log("系统数据存储完成");
    })
}
//保存登录者的文件
function saveDataLogin() {
    fs.writeFile(path.join(__dirname, "../userlogin.json"), JSON.stringify(userLogin), (err) => {
        console.log("login系统数据存储完成");
    })
}

module.exports = router
