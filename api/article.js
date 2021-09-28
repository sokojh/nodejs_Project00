const { Article, User } = require('../mongoose/model')

// @ts-check
// Create
const articleCreate = async (req, res) => {
  const { auther, contentImgKey, contentText } = req.body
  const newArticle = await Article({ auther, contentImgKey, contentText })
  const saveRequest = await newArticle.save() // 디비에 저장
  console.log(saveRequest)
  res.send(saveRequest)
}

// Read
const articleRead = async (req, res, next) => {
  const { email } = req.body
  const articles = await Article.find({ email })
  req.articles = articles
  next()
}
// /@/:weeksomId 유저게시물, 북마크, 좋아요 컨텐츠 검색
const profileArticle = async (req, res, next) => {
  const { _id, weeksomId } = req.userProfile
  const userArticle = await Article.find({ auther: _id })
  const likeArticle = await Article.find({
    likePeoples: { $elemMatch: weeksomId },
  })
  const bookmarkArticle = await Article.find({
    bookmarkPeoples: { $elemMatch: weeksomId },
  })
  req.likeArticle = likeArticle
  req.userArticle = userArticle
  req.bookmarkArticle = bookmarkArticle
  next()
}

// populate Read
const articlePopRead = async (req, res, next) => {
  const articles = await Article.find()
    .sort({ createDate: -1 }) // 게시물을 작성일 기준으로 내림차순, 최근 게시물부터 출력
    .populate('auther') // 게시물의 작성자를 받아오기 위한 관계 맺기
  req.articles = articles
  next()
}

// Update
const articleUpdate = async (req, res) => {
  const { id, contentText } = req.body
  const updatedArticle = await Article.findByIdAndUpdate(id, { contentText }) // 리턴값으로 수정전 오리진데이터 사용
  res.send(updatedArticle)
}

// Delete
const articleDelete = async (req, res, next) => {
  const deleteArticle = await Article.findByIdAndDelete(req.body).exec(
    (error, result) => {
      error ? res.status(400).send(error) : res.status(200).send(result)
      next()
    }
  )
}

// likeUpdate
const likeUpdate = async (req, res, next) => {
  const likePressName = req.user.weeksomId
  const _id = { _id: req.body.articleId }
  // req.body.status === 1 // 좋아요 처리
  // req.body.status === 0 // 좋지 않아요 처리
  const { status } = req.body
  if (status === '1') {
    await Article.findByIdAndUpdate(_id, {
      $inc: { likeCount: 1 },
      $addToSet: { likePeoples: likePressName },
    }).exec((error, result) => {
      error ? res.status(400).send('에러') : next()
    })
    await User.findOneAndUpdate(
      { weeksomId: likePressName },
      { $addToSet: { likeArticle: likePressName } }
    ).exec((error, result) => {
      error ? res.status(400).send('에러') : next()
    })
  } else {
    await Article.findByIdAndUpdate(_id, {
      $inc: { likeCount: -1 },
      $pull: { likePeoples: likePressName },
    }).exec((error, result) => {
      error ? res.status(400).send('에러') : next()
    })
    await User.findOneAndUpdate(
      { weeksomId: likePressName },
      { $pull: { likeArticle: likePressName } }
    ).exec((error, result) => {
      error ? res.status(400).send('에러') : next()
    })
  }
  res.status(200).send('좋아요 성공')
  next()
}

module.exports = {
  articleCreate,
  articleRead,
  articleUpdate,
  articleDelete,
  articlePopRead,
  likeUpdate,
  profileArticle,
}
