const { Article } = require('../mongoose/model')

// Create
const articleCreate = async (req, res) => {
  const { auther, contentImgKey, contentText } = req.body
  const newArticle = await Article({ auther, contentImgKey, contentText })
  const saveRequest = await newArticle.save() // 디비에 저장
  console.log(saveRequest)
  res.send(saveRequest)
}

// Read
const articleRead = async (req, res, next) => {
  const email = req.body.email
  const articles = await Article.find({ email: email })
  req.articles = articles
  next()
}

// populate Read
const articlePopRead = async (req, res, next) => {
  //const email = req.body.email
  const articles = await Article.find().populate('auther')
  req.articles = articles
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
  articleCreate,
  articleRead,
  articleUpdate,
  articleDelete,
  articlePopRead,
}
