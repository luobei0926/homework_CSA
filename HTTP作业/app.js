/**
 * 程序入口
 

 */

//引入依赖
const exp = require("constants")
const cookieSession = require("cookie-session")
const express = require("express")
const path = require("path")
const user = require("./routes/user")
    //创建服务器
const app = express()
app.set("view engine", 'ejs')
app.use(express.urlencoded({ extended: false }))
    //开启seesion
app.use(cookieSession({
        name: 'session',
        keys: ['(#@wre234#@!$', 'q34())*#@$df']
    }))
    //加载用户模块
app.use("/user", user)
    //添加测试路径
app.get("/data/str", (req, res) => {
    res.send("<h3>hello express</h3>")
})
app.get("/data/obj", (req, res) => {
    let obj = { name: "officn", age: 20 }
    res.send(obj)
})
app.get("/data/html", (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"))
})
app.get("/data/ejs", (req, res) => {
        res.render('index', { user: 'lb' })
    })
    //启动服务器


//验证用户身份(用户登录时,使用ajax请求这个接口即可)
app.get("/data/login", (req, res) => {
    //1)校验客户端传递来的用户名与密码和数据库里面的是否一致
    //2)给客户端种cookie,并且同时服务端留一份session
    req.session.azrael = "username"
        //3)后端种完cookie后，就可以给前端返回数据
    res.send({
        err: 0,
        msg: "恭喜您,登录成功了！",
        data: {
            username: "张三"
        }
    })
})

//自动登录功能
app.get("/data/user", (req, res) => {
    //读cookie对比session
    //如果前端传递来的cookie是有效的，那么req.session.nz1906的值就是“userId"
    //如果前端传递来的cookie失效了，那么req.session.nz1906的值就是undefined
    let pass = req.session.azrael //如果用户登录了，那么pass="userId"，如果用户cookie失效或者没有，那么返回null
    if (pass) {
        //说明用户身份一直存在的，取库数据，并且返回
        res.send({
            erro: 0,
            data: "/user的数据！！！"
        })
    } else {
        res.send({
            err: 1,
            data: "用户未登录...或者登录过期了.."
        })
    }
    res.end()
})

app.listen(3000, () => console.log("服务已经启动"))
