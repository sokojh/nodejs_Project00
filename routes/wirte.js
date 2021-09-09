
var router = require('express').Router();

function 로그인했니(요청,응답,next){
    if (요청.user){
        next()
    } else {
        응답.render('login_req.ejs')
    }
}
router.use('/new',로그인했니);

router.get('/new',function(요청,응답){
    //응답.sendfile(__dirname + '/views/write.ejs');
    응답.render('../views/write.ejs'); 
});

//router.use(로그인했니); 모든곳에 미들웨어 넣을수있는 매서드
//router.use('/game',로그인했니);  이거는 특정 /game 접속할때만 미들웨어를 시작하겠다는 뜻


module.exports = router;
