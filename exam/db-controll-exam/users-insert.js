const client = require('../../src/mongo')

async function main() {
  await client.connect() // 디비 연결
  const db = client.db('weeksom')

  // Reset
  await db.collection('users').deleteMany({})

  // 유져 디비
  await db.collection('users').insertMany([
    {
      email: 'test1@kakao.com',
      password: 'qwer1234#',
      nickname: '알파카',
      weeksomId: 'test1',
      profileImgKey: '',
      userinfo: '테스트1 계정입니다.',
      following: ['test2@kakao.com', 'test3@kakao.com', 'test4@kakao.com'],
      follower: ['test2@kakao.com', 'test3@kakao.com', 'test5@kakao.com'],
      article: [],
      bookmark: [],
    },
    {
      email: 'test2@kakao.com',
      password: 'qwer1234#',
      nickname: '사자',
      weeksomId: 'test2',
      profileImgKey: '',
      userinfo: '테스트2 계정입니다.',
      following: ['test2@kakao.com', 'test3@kakao.com', 'test4@kakao.com'],
      follower: ['test2@kakao.com', 'test3@kakao.com', 'test5@kakao.com'],
      article: [],
      bookmark: [],
    },
  ])

  // find검색, project필드
  const cursor = db.collection('users').find({ weeksomId: 'test2' }).project({})
  // eslint-disable-next-line no-console
  await cursor.forEach(console.log)

  await client.close()
}

main()
