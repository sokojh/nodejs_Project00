const bcript = require('bcrypt')
const { obj } = require('./mongoose/schema/user')

const str = 'aaaaasssss'

// 콜백함수사용
// bcript.hash(str, 10, async (err, hash) => {
//   console.log(hash)
//   const hashedStr = hash

//   bcript.compare(str, hashedStr, (err, result) => {
//     console.log('문자열 일치여부 :', result)
//   })
// })

// 프로미스 사용
let hashedStr = ''
bcript.hash(str, 10).then((hash) => {
  hashedStr = hash
})

console.log(hashedStr)
console.log(hashedStr)
