const router = require('express').Router({ mergeParams: true }) // mergeParams 옵션을 줘야 이전파라미터를 받아옴
const { User } = require('../api/0.index') // 몽구스 api 임포트

// 프로필
router.get(
  '/',
  (req, res, next) => {
    console.log('profile 라우터 연결')
    if (req.user === req.params) {
      res.render('profile.ejs', { 프로필: req.user })
    } else {
      next()
    }
  },
  User.viewUserProfile,
  (req, res) => {
    console.log('클라이언트 : /:weeksomId 라우터 연결')
    res.render('profile.ejs', { 프로필: req.userProfile })
  }
)

module.exports = router
