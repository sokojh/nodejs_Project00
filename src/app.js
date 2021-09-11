require('dotenv').config() // env
const mongo = require('./mongo') // 몽고 디비 연결모듈
const express = require('express') // 익스프레스
const { Server } = require('socket.io') // 소캣 io

const app = express() // 익스프레스 객체 생성
const router = express.Router() // 라우터 객체 생성
const http = require('http').createServer(app)
const io = new Server(http) // 소캣 객체 생성

// 클라이언트 POST request data의 body로부터 파라미터를 편리하게 추출합니다.
app.use(express.urlencoded({ extended: true }))
// view 엔진을 ejs로 볼수있게 선언.
app.set('view engine', 'ejs')
// static 폴더 지정해주는것 public폴더를 고정폴더로 서버 시작할때 사용하게 만들어줌.
app.use('/public', express.static('public'))
// 폼에 매서드 만들수있는 라이브러리.
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
// 몽고디비 연결
mongo.connect()
const db = mongo.db('weeksom')

// s3 이미지 가져오기
app.get('/image/:key', (요청, 응답) => {
  const key = 요청.params.key
  const readStream = getFileStream(key)
  readStream.pipe(응답)
})

// 하나면 홈임
app.get('/', function (요청, 응답) {
  // 응답.sendfile(__dirname + '/views/index.ejs');
  응답.render('index.ejs')
})

app.use('/write', require('../routes/write'))
app.use('/chat', require('../routes/chat'))
app.use('/member', require('../routes/member'))
app.use('/notice', require('../routes/notice'))
app.use('/profile', require('../routes/profile'))
app.use('/search', require('../routes/search'))

module.exports = app

// //app.post('/image',upload.single('프로필'), async (요청,응답) => {
//     const file = 요청.file
//     //파일 내용을 확인하는 로그
//     console.log(file)
//     //여기서 이미지 키값을 가져옵니다.
//     const result = await uploadFile(file)
//     //파일이 업로드 되었을때 확인하는로그
//     console.log(result)
//     const description = 요청.body.description
//     응답.send({imagePath: '/add/${result.key}'})
//     db.collection('weaksom').findOne({name : '게시물갯수'},function(에러,결과){
//         console.log(결과.totalPost);
//         var 총게시물갯수 = 결과.totalPost;
//         var 저장할거 = { _id : 총게시물갯수 + 1,제목 : 요청.body.title, 날짜 : 요청.body.date , 작성자 : 요청.user._id}
//         db.collection('post').insertOne(저장할거,function(에러,결과){
//             console.log('저장완료');
//             //counter라는 콜렉션에 있는 totalPost라는 항목도 1 증가시켜야함 (수정)
//             db.collection('counter').updateOne({name : '게시물갯수'},{ $inc : {totalPost:1}},function(에러,결과){
//                 if(에러) {return console.log(에러)}
//                 console.log(결과)
//             });
//        })
//     });
//     });
