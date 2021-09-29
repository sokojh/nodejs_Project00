const client = require('../src/mongo')

async function main() {
  await client.connect() // 디비 연결
  const db = client.db('weeksom')
  
  // 게시물등록 디비
  await db.collection('article').insertOne(
    {
      email: '',
      writer: '',
      articleImgKey: [],
      text: '',
      createDate: new Date,
    }
  )
  // 게시물 댓글 디비
}