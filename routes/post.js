const router = require('express').Router({ mergeParams: true }) // 유저 정보를 사용하려면 파라미터를 받아와야됨.
const multer = require('multer') // 파일 객체를 사용하기위해 multer 선언
const { User, Article } = require('../api/0.index')
// 몽구스 api 임포트
const upload = multer({ dest: 'upload/' }) // upload에 실제 파일을 저장해야만 s3로 보낼때 동일한이름을 유지할수있기때문에해야합니다.(이런방법으로 안쓰면 이름이 동일하지않아서 다음에 찾을때 못찾아요..)
const { uploadFile, getFileStream } = require('../s3') // 업로드,다운로드 함수를 사용하기위해 불러옴
const { articleCreate } = require('../api/article')

router.get('/', (req, res, next) => {
  console.log('post 라우터 연결', req.user)
  res.render('post.ejs', { 프로필: req.user })
})
// /post/images/:key 주소를 적으면  s3에서 이미지 받아오는 기능
router.get('/images/:key', (req, res) => {
  console.log(req.params)
  const { key } = req.params
  const readStream = getFileStream(key)

  readStream.pipe(res)
})

router.post(
  '/',
  upload.single('file'),
  async (req, res, next) => {
    // 클라이언트에서 넘어온 파일에 대한 정보가 req.file에 FILE 객체로 저장되어 있습니다.
    const { file } = req
    console.log(file)
    const result = await uploadFile(file)
    console.log(result)
    req.body.contentImgKey = result.Location
    req.body.auther = req.user._id
    console.log(req.user._id)
    const { description } = req.body
    console.log(req.body.contentImgKey, req.body.author, req.body.contentText)
    next()
  },
  Article.articleCreate
)

module.exports = router
