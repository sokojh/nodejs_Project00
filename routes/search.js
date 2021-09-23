//@ts-check
const model = require('../mongoose/model')
const router = require('express').Router()
const { Article } = require('../api/0.index') // 몽구스 api 임포트

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
  var 검색조건 = [
    {
      $search: {
        index: 'articleSearch',
        text: {
          query: req.query.value,
          path: 'contentText',
        },
      },
    },
    { $sort: { _id: 1 } },
    { $limit: 9 },
  ]
  model.db
    .collection('articles')
    .aggregate(검색조건)
    .toArray((에러, 결과) => {
      console.log(결과.length)
      //res.render('search.ejs', { posts: 결과 })
      if (결과.length == 0) {
        res.render('searchfail.ejs', { valuefail: req.query.value })
      } else {
        res.render('search.ejs', { posts: 결과 })
      }
    })
})
module.exports = router
