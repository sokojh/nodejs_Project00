const client = require('../src/mongo')

async function main() {
  await client.connect() // 디비 연결
  const db = client.db('weeksom')

  // Reset
  await db.collection('chats').deleteMany({})

  // 채팅 디비
  const hostname = 'b5받아온정보'
  const guestname = '1받아온정보'
  const roomId = [hostname, guestname].sort().toString()
  const message = '받아온정보'
  const password = '받아온정보'
  await db.collection('chats').insertMany(
    [
      {
        roomId: roomId,
        email: hostname,
        message: message,
        date: new Date, // 자동입력
        password: password,
      }
    ]
  )

  // find검색, project필드
  const cursor = db.collection('chats').find({
    roomId: '1받아온정보,b5받아온정보'
  })
  // eslint-disable-next-line no-console
  await cursor.forEach(console.log)
  await client.close()
}

main()