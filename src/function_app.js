function 로그인했니(요청, 응답, next) {
    if (요청.user) {
        console.log("로그인실행")
        next()
    } else {
        console.log("로그인실행")
        응답.render('login_req.ejs');
    }
}


module.exports.로그인했니 = 로그인했니