const router = require('express').Router()
const { User } = require('../api/0.index') // 몽구스 api 임포트

router.get('/', (req, res) => {
  // todo something
  res.render('chat.ejs', { user: req.user })
})

router.post('/', User.chatUser, (req, res) => {
  const { weeksomId, profileImgKey } = req.userProfile
  console.log(weeksomId, profileImgKey)
  res.send(200, { weeksomId, profileImgKey })
})
module.exports = router
