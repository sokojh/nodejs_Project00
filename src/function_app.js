

function 로그인했니(요청,응답,next){
    if (요청.user){
        next()
    } else {
        응답.render('login_req.ejs');
    }
}


module.exports = app_function