const router = require('express').Router({ mergeParams: true }) //유저 정보를 사용하려면 파라미터를 받아와야됨.
const { User } = require('../api/0.index') // 몽구스 api 임포트
router.get('/', (req, res, next) => {
  console.log('post 라우터 연결')
  res.render('post.ejs', { 프로필: req.user })
})
module.exports = router
