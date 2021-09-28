const router = require('express').Router({ mergeParams: true }) // mergeParams 옵션을 줘야 이전파라미터를 받아옴
const { User, Article } = require('../api/0.index') // 몽구스 api 임포트

// 프로필
router.get(
  '/',
  User.viewUserProfile,
  (req, res, next) => {
    if (req.userProfile !== undefined) {
      next()
    } else {
      res.redirect('/', { msg: '해당 아이디가 없습니다.' })
    }
  },
  Article.profileArticle,
  (req, res) => {
    console.log('클라이언트 : /:weeksomId 라우터 연결')
    req.userArticle.forEach((obj) => {
      // console.log(obj)
    })
    res.render('profile.ejs', {
      프로필: req.userProfile,
      article: req.userArticle,
      user: req.user,
    })
  }
)

module.exports = router
