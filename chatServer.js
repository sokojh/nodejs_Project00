const express = require('express')
const http = require('http') // http 코어 모듈
require('dotenv').config()

const app = express() // express 실행내용을 app에 넣음
// 주소 만들어주는 모듈. 인자로 받은 경로들을 하나의 문자열 형태로 주소 리턴
const server = http.createServer(app) // express를 http로 통해 실행

const socketIO = require('socket.io')
// 소켓 io
const io = socketIO(server)

const moment = require('moment')

app.use('/public', express.static('public'))
app.set('views', 'views') // 익스프레스 뷰 폴더 경로는 기본값으로 views를 사용
app.set('view engine', 'ejs') // 뷰엔진 ejs 사용

const PORT = process.env.PORT || 8080
server.listen(PORT, () => console.log(`http://localhost:${process.env.PORT}`)) // 포트 연결

app.get('/', (요청, 응답) => {
  응답.render('chat.ejs')
})

io.on('connection', (socket) => {
  socket.on('chatting', (data) => {
    // data : 클릭을 했을 때 넘겨받는 닉네임, 내용, 시간
    const { name, msg } = data
    console.log(data) // data를 보내고
    io.emit('chatting', {
      // 받고
      name,
      msg,
      time: moment(new Date()).format('h:ss A'),
    })
  })
}) // 연결의 정보를 socket에 담음
