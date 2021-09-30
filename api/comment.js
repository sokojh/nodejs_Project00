const { Article, Comment } = require('../mongoose/model')

// @ts-check
// 모든 코멘트 검색
const commentList = async (req, res, next) => {
  const commentList = await Comment.find({})
  req.commentList = commentList
  next()
}

// articleId 로 코멘트 검색 { 댓글, 댓글의 유저 id 값 기준 유저정보 populate }
const articleCommentList = async (req, res, next) => {
  const commentList = await Comment.find(req.query) // 쿼리(url 파라미터 값) 가져와 검색
    .sort({ createDate: -1 }) // 댓글 내림차순
    .populate('user_id') // 댓글 작성자 정보 첨부
  req.commentList = commentList

  next()
}

// comment 작성
const commentWrite = async (req, res, next) => {
  let _id = { _id: req.body.article_id }
  let { article_id, text } = req.body // ajax data 에서 해당 값을 불러와 오브젝트로 저장
  const newComment = await Comment({ article_id, text, user_id: req.user._id }) // 스키마로 newComment 객체 생성
  const saveRequest = await newComment.save() // comment 객체로 디비에 저장
  req.saveComment = saveRequest // 디비에 저장완료 후 저장된 객체 반환, 요청정보에 저장
  await Article.findByIdAndUpdate(_id, { $inc: { commentCount: 1 } })
  next()
}

module.exports = {
  commentList,
  articleCommentList,
  commentWrite,
}
