const bcrypt = require('bcrypt')

const str = 'aaaaasssss'
const str2 = 'aaaaasssss'
const saltRounds = 10 // 원문에 소금뿌리기 : 노이즈 제공 : 출력 해시값이 달라진다

const strHash = bcrypt.hashSync(str, saltRounds)
const strHash2 = bcrypt.hashSync(str2, saltRounds)
console.log(saltRounds)
console.log(strHash)
console.log(strHash2)
console.log(bcrypt.compareSync(str, strHash))
console.log(bcrypt.compareSync(str2, strHash2))
console.log(bcrypt.compareSync(str, strHash2))
