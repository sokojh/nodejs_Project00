const router = require('express').Router()
const { Article } = require('../api/0.index') // 몽구스 api 임포트

// 게시물 출력 : article : id
router.get('/', Article.articlePopRead, (req, res) => {
  res.render('articleList', {
    articles: req.articles,
    myName: req.user.weeksomId,
  })
})

// 게시물 좋아요
router.post('/likeUpdate', Article.likeUpdate, (req, res) => {
  console.log('라우터')
})

module.exports = router
