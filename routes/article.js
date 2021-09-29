const router = require('express').Router()
const { Article } = require('../api/0.index') // 몽구스 api 임포트

// 게시물 출력 : article : id
router.get('/', Article.articlePopRead, (req, res) => {
  res.render('articleList', {
    articles: req.articles,
    myUserInfo: req.user,
  })
})

// 게시물 좋아요
router.post('/likeUpdate', Article.likeUpdate, (req, res) => {})

//게시물 북마크 처리
router.post('/bookmarkUpdate', Article.bookmarkUpdate, (req, res) => {})

// 게시물 삭제
router.post('/delete', Article.articleDelete, (req, res) => {})

module.exports = router
