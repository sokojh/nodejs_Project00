const router = require('express').Router()
const { findSourceMap } = require('module')
const { Article } = require('../api/0.index') // 몽구스 api 임포트

// 게시물 출력 : article : id
router.get('/', Article.articleRead, (req, res) => {
  res.render('articleList', { articles: req.Article[3] })
  console.log(req.Article[3])

  find().populte(user)
})

module.exports = router
