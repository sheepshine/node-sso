let express = require('express'),

    session = require('express-session'),
    mongoose=require('mongoose'),
    MongoStore = require('connect-mongo')(session),
    bodyParser = require('body-parser'),
    config = require('config'),
    path = require('path'),
    router = express.Router(),
    cookieSign = require('cookie-signature'),
    app = express();


    mongoose.Promise = require('bluebird');

    app.set('views', './view');
    app.set('view engine', 'jade');

    app.use("", express.static('public/'));

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
router.get('/test', function(req,res) {  //登录页面
    console.log(req.session)
    res.send(req.session)
});

router.get('/ajaxtest', function(req,res) { 
    console.log(req.session)
    res.send(req.session)
});




app.use(router);

let server = app.listen(8088, function () {
    console.log('服务已开始运行 http://%s:%s');
});