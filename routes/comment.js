const router = require('express').Router()
const { findSourceMap } = require('module')
const { Comment } = require('../api/0.index') // 몽구스 api 임포트

// comment 출력
router.get('/', Comment.commentList, (req, res) => {
  console.log('커멘트 라우터 연결')
  res.render('comment.ejs', {
    commentList: req.commentList,
    userId: req.user.weeksomId,
  })
})

module.exports = router
