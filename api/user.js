const { User } = require('../mongoose/model') //model 객체에 exports한 스키마가 들어있음

// const model = require(../mongoose/model)
// const user = model.User
// 이걸 저 위의 한줄로 만든거임

// 회원가입
const userSignup = async (req, res) => {
  //userSignup 메서드를 만듬. async:동기화함수
  const { email, weeksomId, password, nickname } = req.body //body : 폼데이터

  const newUser = await User({ email, weeksomId, password, nickname }) //async를 붙이면 await(작업 끝날 때까지 기다려줌)이 붙은 항목에 가서 동기화된 작업을 해줌
  const saveRequest = await newUser.save() // .save() : 디비에 저장하면 저장된 데이터 리턴
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
