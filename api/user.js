const { User } = require('../mongoose/model')

const bcrypt = require('bcrypt')

// 회원가입
const userSignup = async (req, res) => {
  const { email, weeksomId, passwordConfirm, nickname } = req.body
  // 비밀번호 해시값으로 변경( 사용법은 exam > bcryptTest.js참고 )
  const hashedPassword = await bcrypt.hashSync(passwordConfirm, 10)
  const newUser = await User({ email, weeksomId, hashedPassword, nickname })
  const saveRequest = await newUser.save() // 디비에 저장하면 저장된 데이터 리턴
  console.log(saveRequest)
  res.send(saveRequest)
}

// 프로필 유져 검색 /profile/:weeksomid
const viewUserProfile = async (req, res, next) => {
  const weeksomId = req.params.weeksomId
  console.log(weeksomId)
  const userProfile = await User.find({ weeksomId: weeksomId })
  req.userProfile = userProfile[0]
  next()
}

// Update
const articleUpdate = async (req, res) => {
  const { id, contentText } = req.body
  const updatedArticle = await Article.findByIdAndUpdate(id, { contentText }) //리턴값으로 수정전 오리진데이터 사용
  res.send(updatedArticle)
}

// Delete
const articleDelete = async (req, res) => {
  const { id } = req.params
  const deleteArticle = await Article.findByIdAndDelete(id)
  res.send(deleteArticle)
}

module.exports = {
  userSignup,
  viewUserProfile,
}
