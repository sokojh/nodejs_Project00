const router = require('express').Router()
const appfn = require('../src/function_app')

router.get('/new', appfn.로그인했니, function (요청, 응답) {
  응답.render('../views/profile.ejs', { user: req.user })
})

module.exports = router
