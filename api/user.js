const { User } = require('../mongoose/model')

// 회원가입
const userSignup = async (req, res) => {
  const { email, weeksomId, password, nickname } = req.body

  const newUser = await User({ email, weeksomId, password, nickname })
  const saveRequest = await newUser.save() // 디비에 저장하면 저장된 데이터 리턴
  console.log(saveRequest)
  res.send(saveRequest)
}

// Read
const articleRead = async (req, res) => {
  const email = req.body.email
  const articles = await Article.find({ email: email })
  res.send(articles)
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
}
