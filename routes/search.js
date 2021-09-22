//@ts-check
const router = require('express').Router()
const { Article } = require('../api/0.index') // 몽구스 api 임포트

// 게시물 출력 : article : id
router.get('/', Article.articlePopRead, (req, res) => {
  console.log('search 라우터 연결')
  // @ts-ignore
  res.render('search', { articles: req.articles })
  // @ts-ignore
  console.log(req.articles)
})

module.exports = router
