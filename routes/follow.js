const router = require('express').Router()
const { User } = require('../api/0.index') // 몽구스 api 임포트

// 유져리스트
router.patch('/', User.followUpdate)

module.exports = router
