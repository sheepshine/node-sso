let express = require('express'),

    session = require('express-session'),
    mongoose=require('mongoose'),
    MongoStore = require('connect-mongo')(session),
    bodyParser = require('body-parser'),
    config = require('config'),
    path = require('path'),
    cookieSign = require('cookie-signature'),
    router = express.Router(),
    app = express();


    mongoose.Promise = require('bluebird');

    app.set('views', './view');
    app.set('view engine', 'jade');

    app.use("", express.static('public/dist/'));

    app.use(session({
        secret: "STFED",
        store: new MongoStore({
            url: "mongodb://Dev2:stargame@10.238.253.8:27017/star-game",
            collection: "sessions"
        }),
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge:1000*60*100,
            httpOnly: false
        },
        rolling: true
    }));

    app.use(bodyParser.json());

let options = {
    db:{native_parser:true},
    server:{
        auto_reconnect: true,   //自动重连
        poolSize:5      //连接池大小
    }
};

// 跨域设置

mongoose.connect('mongodb://Dev2:stargame@10.238.253.8:27017/star-game',options);




app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


/*路由模块*/
router.get('/login', function(req,res) {  //登录页面
    console.log(req.session)
    req.session=null;//删除cookie
    res.render('login',{
        title:"login"
    })
});

router.post('/login', function(req, res) {//提交登录数据
    console.log(req.body)
    var sinfo = req.body;//<==获取post数据
    req.session.sinfo = sinfo;//<===存入session,模拟登录成功
    res.send('success')
    // this.redirect('/');//<===跳转向到你要的页面
});

router.get('/', function(req, res){
    if(req.session.sinfo) {
        res.send('已登录')
    }else{
        res.send('未登录')
    }
});

router.get('/sso.js', function(req, res) { //动态js
    
    var _sessionId=req.sessionID;
    var sessionValue='s:'+cookieSign.sign(_sessionId,'STFED')
    if(req.session&&req.session.sinfo){
        //this.body=`var kosid='${this.sessionId}';`;//示例写入sessionId,也就是存入到redis的key
       // store.get(sid, function(){})
        res.send('var kosid="'+sessionValue+'"')
    }else{
        res.send('请登录')
    }
});




app.use(router);

let server = app.listen(8087, function () {
    console.log('服务已开始运行 http://%s:%s');
});