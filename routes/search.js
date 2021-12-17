// @ts-check

const mongoose = require('mongoose')

const db = mongoose.connection
const router = require('express').Router()
const { Article, Comment } = require('../api/0.index') // 몽구스 api 임포트
router.post('/modalUpdate', Article.modalUpdate, (req, res) => {})
router.post('/modalCommentUpdate', Article.modalCommentUpdate, (req, res) => {})
// 게시물 출력 : article : id
// Article.articlePopRead 미들웨어 제거
router.get('/', (req, res) => {
  console.log('search 라우터 연결')
  res.render('search', { myUserInfo: req.user })
})

// 검색 value값 전용
router.get('/v', (req, res) => {
  console.log('벨류값을 보냄')
  console.log(req.query.value)
  const 검색조건 = [
    {
      $search: {
        index: 'articleSearch', // 아틀라스 인덱스 사용
        text: {
          query: req.query.value, // 검색쿼리는 주소값을 이용
          path: 'contentText', // 텍스트데이터
        },
      },
    },
    { $sort: { createDate: -1 } },
    { $limit: 9 },
  ]
  db.collection('articles')
    .aggregate(검색조건)
    .toArray((에러, 결과) => {
      console.log(결과.length)
      // res.render('search.ejs', { posts: 결과 })
      if (결과.length === 0) {
        res.render('searchFail.ejs', { valuefail: req.query.value })
      } else {
        res.render('searchSuc.ejs', {
          articles: 결과,
          myUserInfo: req.user,
          valueSuc: req.query.value,
          searchReq: 결과.length,
        })
      }
    })
})

module.exports = router
