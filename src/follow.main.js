// 팔로우 넣고 빼기

const client = require('./mongo')

async function main() {
  await client.connect() // 디비 연결

  // db
  const db = client.db('weeksom')

  // Reset
  await db.collection('users').deleteMany({})
  await db.collection('chats').deleteMany({})
  await db.collection('article').deleteMany({})

  // 게시물등록 디비
  await db.collection('article').insertOne({
    email: '',
    writer: '',
    articleImgKey: [],
    text: '',
    createDate: new Date(),
  })
  // 게시물 댓글 디비
  // 채팅 디비
  const hostname = 'b5받아온정보'
  const guestname = '1받아온정보'
  const roomId = [hostname, guestname].sort().toString()
  const message = '받아온정보'
  const password = '받아온정보'
  await db.collection('chats').insertMany([
    {
      roomId: roomId,
      email: hostname,
      message: message,
      date: new Date(), // 자동입력
      password: password,
    },
  ])
  // 유져 디비
  await db.collection('users').insertMany([
    {
      email: 'test1@kakao.com',
      password: 'qwer1234#',
      nickname: '알파카',
      profileImgKey: '',
      userinfo: '',
      following: ['test2@kakao.com', 'test3@kakao.com', 'test4@kakao.com'],
      follower: ['test2@kakao.com', 'test3@kakao.com', 'test5@kakao.com'],
      article: [],
      bookmark: [],
    },
    {
      email: 'test2@kakao.com',
      password: 'qwer1234#',
      nickname: '사자',
      profileImgKey: '',
      userinfo: '',
      following: ['test2@kakao.com', 'test3@kakao.com', 'test4@kakao.com'],
      follower: ['test2@kakao.com', 'test3@kakao.com', 'test5@kakao.com'],
      article: [],
      bookmark: [],
    },
  ])

  // 팔로잉 수정 push넣기 pull빼기

  // 프론트에서 받아올 유져정보
  const 주체 = 'test2@kakao.com'
  const 대상자 = 'kogoome@kakao.com'
  const fidx = 0
  // 업데이트 할 디비문서 선택자
  const filter = { email: 주체 }
  // 문서 수정
  const follow = [
    { $push: { following: 대상자 } }, // 0번인덱스 팔로잉 +
    { $pull: { following: 대상자 } }, // 1번인덱스 팔로잉 -
    { $push: { follower: 대상자 } }, // 2번인덱스 팔로워 +
    { $pull: { follower: 대상자 } }, // 3번인덱스 팔로워 -
  ]

  // @ts-ignore
  await db.collection('users').updateOne(filter, follow[fidx])

  // find검색, project필드
  const cursor = db
    .collection('chats')
    .find({
      roomId: '1받아온정보,b5받아온정보',
    })
    .project({})
  // eslint-disable-next-line no-console
  await cursor.forEach(console.log)

  await client.close()
}

main()
