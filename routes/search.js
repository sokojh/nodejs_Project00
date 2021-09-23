//@ts-check
const router = require('express').Router()
const { Article } = require('../api/0.index') // 몽구스 api 임포트
var db
// 게시물 출력 : article : id
//Article.articlePopRead 미들웨어 제거
router.get('/', (req, res) => {
  console.log('search 라우터 연결')
  // @ts-ignore
  res.render('search', { articles: req.articles })
  // @ts-ignore
  console.log(req.articles)
  console.log(req.query.value)
})
//검색 value값 전용
router.get('/v', (req, res) => {
  console.log('벨류값을 보냄')
  console.log(req.query.value)
})

module.exports = router