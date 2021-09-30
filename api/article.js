const { Article, User, Comment } = require('../mongoose/model')

// @ts-check
// Create
const articleCreate = async (req, res) => {
  const { auther, contentImgKey, contentText } = req.body
  const newArticle = await Article({ auther, contentImgKey, contentText })
  const saveRequest = await newArticle.save() // 디비에 저장
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
    likePeoples: weeksomId,
  })
  const bookmarkArticle = await Article.find({
    bookmarkPeoples: weeksomId,
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
// modal 글 가져오기
const modalUpdate = async (req, res, next) => {
  const modalArticlesRead = await Article.find({ _id: req.body._id })
    .sort({ createDate: -1 })
    .populate('auther')
    .exec((error, result) => {
      error ? res.status(400).send(error) : res.status(200).send(result)
      console.log('이건가' + result)
      next()
    })
}
//modal 댓글 가져오기
const modalCommentUpdate = async (req, res, next) => {
  var foo = new Object()
  foo.article_id = req.body['article_id']
  console.log(req.body._id)
  const commentList = await Comment.find({ article_id: req.body._id }) //id 객체 가져와서 검색
    .sort({ createDate: -1 }) // 댓글 내림차순
    .populate('user_id')
    .exec((error, result) => {
      error ? res.status(400).send(error) : res.status(200).send(result)
      next() // 댓글 작성자 정보 첨부
    })
}
// 좋아요 설정
const likeUpdate = async (req, res, next) => {
  const myWeeksomId = { weeksomId: req.user.weeksomId }
  const likePeoples = { likePeoples: req.user.weeksomId }
  const likeArticle = { likeArticle: req.body.articleId }
  const _id = { _id: req.body.articleId }
  const { status } = req.body
  // status === 1 // 좋아요 처리
  // status === 0 // 좋아요 취소 처리
  if (status === '1') {
    await Article.findByIdAndUpdate(_id, {
      $inc: { likeCount: 1 },
      $addToSet: likePeoples,
    }).exec((error, result) => {
      error ? res.status(400).send('에러') : next()
    })
    await User.findOneAndUpdate(
      { weeksomId: req.user.weeksomId },
      { $addToSet: likeArticle }
    ).exec((error, result) => {
      error ? res.status(400).send('에러') : next()
    })
  } else {
    await Article.findByIdAndUpdate(_id, {
      $inc: { likeCount: -1 },
      $pull: likePeoples,
    }).exec((error, result) => {
      error ? res.status(400).send('에러') : next()
    })
    await User.findOneAndUpdate(myWeeksomId, { $pull: likeArticle }).exec(
      (error, result) => {
        error ? res.status(400).send('에러') : next()
      }
    )
  }
  res.status(200).send('좋아요 성공')
  next()
}

// 북마크 설정
const bookmarkUpdate = async (req, res, next) => {
  const myWeeksomId = { weeksomId: req.user.weeksomId }
  const bookmarkPeoples = { bookmarkPeoples: req.user.weeksomId }
  const bookmark = { bookmark: req.body.articleId }
  const _id = { _id: req.body.articleId }
  const { status } = req.body
  // status === 1 // 북마크 설정
  // status === 0 // 북마크 취소 설정
  if (status === '1') {
    console.log('좋아요 처리')
    await Article.findByIdAndUpdate(_id, { $addToSet: bookmarkPeoples }).exec(
      (error, result) => {
        error ? res.status(400).send('에러') : next()
      }
    )
    await User.findOneAndUpdate(myWeeksomId, { $addToSet: bookmark }).exec(
      (error, result) => {
        error ? res.status(400).send('에러') : next()
      }
    )
  } else {
    console.log('북마크 취소 설정')
    await Article.findByIdAndUpdate(_id, { $pull: bookmarkPeoples }).exec(
      (error, result) => {
        error ? res.status(400).send('에러') : next()
      }
    )
    await User.findOneAndUpdate(myWeeksomId, { $pull: bookmark }).exec(
      (error, result) => {
        error ? res.status(400).send('에러') : next()
      }
    )
  }
  res.status(200).send('북마크 설정 성공')
  next()
}

module.exports = {
  articleCreate,
  articleUpdate,
  articleDelete,
  articlePopRead,
  likeUpdate,
  profileArticle,
  bookmarkUpdate,
  modalUpdate,
  modalCommentUpdate,
}
