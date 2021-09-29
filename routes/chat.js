const router = require('express').Router()

router.get('/', (req, res) => {
  // todo something
  res.render('chat.ejs', { user: req.user })
})

module.exports = router
