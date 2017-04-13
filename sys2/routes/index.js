/**
 * Created by yangchaoben on 2017/3/3.
 */
/**
 * api管理配置模块
 * @authors yangchaoben
 * @date    2017-2-21 13:42:11
 */

const express = require('express'),
    router = express.Router();



router.use(function(req,res,next){
    // var _user=req.session.user;
    //
    // if(_user){
    //     res.locals.user=_user
    // }
    return next()
});

//新增host
router.post('/signin', function(){
    res.render('login',{
        title:"login"
    })
});

module.exports = router;
