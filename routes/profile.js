const router = require('express').Router()
const appfn = require('../src/function_app')

router.get('/', function (요청, 응답) {
  응답.render('../views/profile.ejs')
})

module.exports = router
