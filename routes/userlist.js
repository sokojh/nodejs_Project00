const router = require('express').Router()
const { User } = require('../api/0.index') // 몽구스 api 임포트

// 유져리스트
router.get('/', User.userList, (req, res) => {
  console.log('유져리스트 라우터 연결')
  // req.userlist로 모든 유저 정보 가져옴
  console.log(req.user.weeksomId)
  res.render('userlist.ejs', {
    userlist: req.userlist,
    followingArr: req.user.following,
    followerArr: req.user.follower,
  })
})

module.exports = router
