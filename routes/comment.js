const router = require('express').Router({ mergeParams: true })
const { Comment } = require('../api/0.index') // 몽구스 api 임포트

// :articleId 댓글 리스트 출력
router.get('/', Comment.articleCommentList, (req, res) => {
  console.log('comment/:articleId 라우터 연결')
  console.log(req.commentList)
  res.render('commentList', { list: req.commentList })
})

module.exports = router
