const router = require('express').Router()
const { Article } = require('../api/0.index') // 몽구스 api 임포트

// 게시물 출력 : article : id
router.use('/', Article.articlePopRead, (req, res) => {
  console.log(req.articles)
})

module.exports = router
