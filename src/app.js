
//env 환경설정 사용할수있도록 불러오는 것.
require('dotenv').config()
//공통 함수 기능 불러오는 것.
//const app_function = require('./function_app');
// db 연결하는 기능 불러오는 것.
const mongo = require('./mongo');
// express 라이브러리 사용하는 것.
const express = require('express');
const app = express();
// 소켓.io 실시간 채팅 라이브러리 사용
const http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);




// 클라이언트 POST request data의 body로부터 파라미터를 편리하게 추출합니다.
app.use(express.urlencoded({ extended: true }))
// view 엔진을 ejs로 볼수있게 선언.
app.set('view engine', 'ejs');
// static 폴더 지정해주는것 public폴더를 고정폴더로 서버 시작할때 사용하게 만들어줌.
app.use('/public', express.static('public'));
// 폼에 매서드 만들수있는 라이브러리.
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
// 몽고디비 연결 
mongo.connect();
const db = mongo.db('weeksom')




// 하나면 홈임
app.get('/', function (요청, 응답) {
    // 응답.sendfile(__dirname + '/views/index.ejs');
    응답.render('index.ejs');
});

app.use('/write', require('../routes/write'))
app.use('/chat', require('../routes/chat'))
app.use('/member', require('../routes/member'))
app.use('/notice', require('../routes/notice'))
app.use('/profile', require('../routes/profile'))
app.use('/search', require('../routes/search'))

module.exports = app