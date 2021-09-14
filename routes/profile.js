const router = require('express').Router()
const { User } = require('../api/0.index') // 몽구스 api 임포트

// 프로필
router.get('/', (req, res) => {
  console.log('profile 라우터 연결')
  console.log('전달받은 유져정보', req.user)
  res.render('profile.ejs', { 프로필: req.user })
})
// 검색프로필
router.get('/:weeksomId', User.viewUserProfile, (req, res) => {
  console.log('클라이언트 : profile/:weeksomId 라우터 연결')
  console.log('전달받은 유져정보', req.user)
  console.log('전달받은 파라미터 정보', req.userProfile)
  res.render('profile.ejs', { 프로필: req.userProfile })
})

module.exports = router
