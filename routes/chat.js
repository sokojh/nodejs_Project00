const router = require('express').Router()
const { User } = require('../api/0.index') // 몽구스 api 임포트

router.get('/', (req, res) => {
  // todo something
  res.render('chat.ejs', { user: req.user })
})

router.post('/', User.chatUser, (req, res) => {
<<<<<<< HEAD
  const { weeksomId, profileImgKey } = req.userProfile
=======
  //user.js에 들렀다옴
  const { weeksomId, profileImgKey } = req.userProfile //form값을 전송하는 코드
>>>>>>> de8516b7d0f0ad9ed73811bbeebc6ebe0ed5c814
  console.log(weeksomId, profileImgKey)
  res.send(200, { weeksomId, profileImgKey })
})
module.exports = router
