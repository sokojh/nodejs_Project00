// @ts-check
const router = require('express').Router({ mergeParams: true })
const { Comment } = require('../api/0.index') // 몽구스 api 임포트

// :articleId 댓글 리스트 출력
router.get('/', Comment.articleCommentList, (req, res) => {
  //@ts-ignore
  res.render('commentList', { list: req.commentList, user: req.user })
})

router.post('/write', Comment.commentWrite, (req, res) => {
  //@ts-ignore
  let saveComment = req.saveComment
  saveComment ? res.status(200).send({ save: saveComment }) : res.status(400)
})

module.exports = router
