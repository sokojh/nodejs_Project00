const socket = new WebSocket('ws://localhost:7080')

socket.onopen = () => {
  socket.send('Hello!')
}

socket.onmessage = (data) => {
  console.log(data)
}
