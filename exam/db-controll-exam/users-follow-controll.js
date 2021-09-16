const client = require('../src/mongo')

async function main() {
  await client.connect() // 디비 연결
  const db = client.db('weeksom')

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
  await db.collection('users').find().populate()

  // find검색, project필드
  db.collection('chats').findOne(
    { roomId: '1받아온정보,b5받아온정보' },
    (err, result) => {}
  )

  await client.close()
}

main()
