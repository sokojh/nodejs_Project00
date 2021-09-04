
var router = require('express').Router();

function 로그인했니(요청,응답,next){
    if (요청.user){
        next()
    } else {
        응답.send('로그인안하셨는데요?')
    }
}

//router.use(로그인했니); 모든곳에 미들웨어 넣을수있는 매서드
router.use('/game',로그인했니);
//router.use('/game',로그인했니);  이거는 특정 /game 접속할때만 미들웨어를 시작하겠다는 뜻
router.get('/sports',function(요청,응답){
    응답.send('스포츠 게시판');
});

router.get('/game',function(요청,응답){
    응답.send('게임 게시판');
});
module.exports = router;
