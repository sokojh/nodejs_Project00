const router = require('express').Router({ mergeParams: true }) //유저 정보를 사용하려면 파라미터를 받아와야됨.
const { User } = require('../api/0.index') // 몽구스 api 임포트
const multer = require('multer') // 파일 객체를 사용하기위해 multer 선언
const upload = multer({ dest: 'upload/' }) // upload에 내가 올리는 파일을 다시 올려줌

router.get('/', (req, res, next) => {
  console.log('post 라우터 연결')
  res.render('post.ejs', { 프로필: req.user })
})
router.post('/', upload.single('file'), (req, res) => {
  console.log(req.file)
  // 클라이언트에서 넘어온 파일에 대한 정보가 req.file에 FILE 객체로 저장되어 있습니다.
})

module.exports = router
