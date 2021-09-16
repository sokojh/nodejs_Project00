const { comment } = require('../mongoose/model')

const commentList = async (req, res, next) => {
  // 모든 코멘트 배열검색
  const commentList = await comment.find({})
  req.commentList = commentList
  next()
}

module.exports = {
  commentList,
}
