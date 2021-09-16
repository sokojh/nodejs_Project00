const router = require('express').Router()
const { findSourceMap } = require('module')
const { Comment } = require('../api/0.index') // 몽구스 api 임포트

// comment 출력
router.get('/', Comment.commentList, (req, res) => {
  console.log('유져리스트 라우터 연결')
  // req.userlist로 모든 유저 정보 가져옴
  console.log(req.user.weeksomId)
  res.render('comment.ejs', {
    commentList: req.commentList,
  })
})

module.exports = router
