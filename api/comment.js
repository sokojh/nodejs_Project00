const { Comment } = require('../mongoose/model')

// @ts-check
// 모든 코멘트 검색
const commentList = async (req, res, next) => {
  const commentList = await Comment.find({})
  req.commentList = commentList
  next()
}

// articleId 로 코멘트 검색 { 댓글, 댓글의 유저 id 값 기준 유저정보 populate }
const articleCommentList = async (req, res, next) => {
  const commentList = await Comment.find(req.query).populate('user_id')
  req.commentList = commentList
  next()
}

module.exports = {
  commentList,
  articleCommentList,
}
