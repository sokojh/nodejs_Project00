const express = require('express') 
const http = require('http') //http 코어 모듈

const app = express(); //express 실행내용을 app에 넣음
const path = require('path') //주소 만들어주는 모듈. 인자로 받은 경로들을 하나의 문자열 형태로 주소 리턴
const server = http.createServer(app) //express를 http로 통해 실행 

const socketIO = require('socket.io') //소켓 io
const io =  socketIO(server);

const moment = require("moment")

app.use(express.static(path.join(__dirname, "src"))) 

const PORT = process.env.PORT || 8080;
server.listen(PORT, ()=> console.log('server is running 8080'))  //포트 연결

// app.get('/',function(요청,응답){
//     응답.render('index.ejs') 
// });


io.on('connection', (socket) => {
    
    socket.on("chatting", (data) =>{ //data : 클릭을 했을 때 넘겨받는 닉네임, 내용, 시간
        const { name, msg } = data;
        console.log(data) //data를 보내고
        io.emit("chatting",{ //받고
            name: name,
            msg : msg,
            time : moment(new Date()).format("h:ss A")
        })
    })
})//연결의 정보를 socket에 담음