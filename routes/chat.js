const router = require('express').Router()

// // 채팅 소캣 사용
// const server = require('http').createServer(router) // http로 통해 실행
// const socketIO = require('socket.io')
// // 소켓 io
// const io = socketIO(server)
// const moment = require('moment')

// io.on('connection', (socket) => {
//   socket.on('chatting', (data) => {
//     // data : 클릭을 했을 때 넘겨받는 닉네임, 내용, 시간
//     const { name, msg } = data
//     console.log(data) // data를 보내고
//     io.emit('chatting', {
//       // 받고
//       name,
//       msg,
//       time: moment(new Date()).format('h:ss A'),
//     })
//   })
// }) // 연결의 정보를 socket에 담음\

router.get('/', (req, res) => {
  // todo something
  res.render('chat.ejs')
})

module.exports = router
