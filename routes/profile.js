const router = require('express').Router()
const client = require('../src/mongo')

// 프로필
router.get(
  '/:weeksomId',
  async (req, res, next) => {
    console.log('클라이언트 : profile 라우터 연결')
    console.log('전달받은 유져정보', req.user)
    console.log('전달받은 파라미터 정보', req.params)
    const weeksomId = req.params

    console.log('디비작업은 왜 안함?')
    const db = await client.db('weeksom')
    console.log('디비작업은 왜 안함?')
    const cursor = await db.collection('users').find({ weeksomId: weeksomId })
    console.log('디비작업은 왜 안함?')
    cursor.forEach(console.log)
    console.log('디비작업은 왜 안함?')
    next()
  },
  (req, res) => {
    res.render('profile.ejs', { 사용자: req.user })
  }
)

module.exports = router
