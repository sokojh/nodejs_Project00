;('use strict') //자바스크립트 오류줄임

const socket = io(`ws://${window.location.host}/chat`)

const nickname = document.querySelector('#nickname') //css 선택자 사용가능
const chatList = document.querySelector('.chatting-list')
const chatInput = document.querySelector('.chatting-input')
const sendButton = document.querySelector('.send-button')
const displayContainer = document.querySelector('.display-Container')

chatInput.addEventListener('keypress', (event) => {
  //input 창에서 키프레스 이벤트가 발생할 때 이벤트를 인자로 넘겨줌
  if (event.keyCode === 13) {
    console.log('전송버튼')
    send() //이벤트 키코드가 13 = 엔터면 실행한다
    chatInput.value = '' //텍스트박스 초기화
  }
})

sendButton.addEventListener('click', send) //클릭했을 때 이벤트 발생
//데이터를 object 표기법으로 보냄

function send() {
  console.log('send')
  const param = {
    name: nickname.value,
    msg: chatInput.value,
  }

  //emit으로 보내고
  socket.emit('chatting', param) //param : 문자열로 소켓을 보냄, //chatting : 채팅 id
}

//on으로 받음
socket.on('chatting', (data) => {
  //서버에서 데이터를 받았을 때
  const { name, msg, time } = data
  const item = new LiModel(name, msg, time) //item 변수에 new 키워드를 통해서 li 모델을 초기화
  item.makeLi() //makeLi()호출
  displayContainer.scrollTo(0, displayContainer.scrollHeight) //현재 스크롤값을 읽음
})

// console.log(socket)

function LiModel(name, msg, time) {
  //li 모델을 찍어내서 ul에 던짐
  this.name = name //초기화
  this.msg = msg
  this.time = time

  this.makeLi = () => {
    const li = document.createElement('li')
    li.classList.add(nickname.value === this.name ? 'sent' : 'received')
    // nickname에 value가 넘겨받은 이름과 같으면? 클래스를 sent로 주고 아니면 received로 줌

    //Destructuring
    const dom = `<span class= "profile">
        <span class = "user">${this.name}</span> 
        <img class="image" src="https://placeimg.com/50/50/any" alt=""> 
        </span>
        <span class="message">${this.msg}</span>
        <span class="time">${this.time}</span> `
    li.innerHTML = dom //생성한 li에 innerHTML로 넣어줌
    chatList.appendChild(li) //li형태로 채팅내용 나열
  }
}
