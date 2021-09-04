require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine','ejs');
app.use('/public', express.static('public'));
const methodOverride = require('method-override')
app.use(methodOverride('_method')) 
var db;
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(process.env.DB_URL,function(에러,client){
 
    if(에러){return console.log(에러)} 
 
    db = client.db('todoapp');
    //db.collection('post').insertOne({ 이름 : 'john', _id : 100},function(에러,결과){
    //console.log('저장완료');}); 
    app.listen(process.env.PORT, function(){     
        console.log('listening on '+ process.env.PORT)    
         
    
})

  
 
});
//누군가가 /pet으로 방문을 하면..
//pet 관련된 안내문을 띄워주자
app.get('/pet', function(요청,응답){
    응답.send('펫용품 쇼핑할 수 있는 페이지입니다.');

   
});

app.get('/beauty',function(요청,응답){
    응답.send('뷰티제품을 쇼핑할 수 있는 페이지입니다.');

});
app.get('/stackview',function(요청,응답){
    
    응답.render('stackview.ejs'); 
});
// /하나면 홈임
app.get('/',function(요청,응답){
    //응답.sendfile(__dirname + '/views/index.ejs');
    응답.render('index.ejs');
});
app.get('/write',function(요청,응답){
    //응답.sendfile(__dirname + '/views/write.ejs');
    응답.render('write.ejs'); 
});
app.get('/search',(요청,응답) => {
    var 검색조건 = [
        {
          $search: {
            index: 'titleSearch',
            text: {
              query: 요청.query.value,
              path: '제목'  // 제목날짜 둘다 찾고 싶으면 ['제목', '날짜']
            }
          }
        }//,
        //검색조건 더 주는법 -결과 정렬하기
        //{ $sortv: {_id : 1 }},
        //몇개만 가져올지 제한도 걸기 가능
        //{ $limit : 2 },
        //0주면 검색결과에 안보여줌
        //{ $project : { 제목: 1, _id: 0, score : {$meta: "searchScore"}}}
    ]  
    console.log(요청.query.value)
    db.collection('post').aggregate(검색조건).toArray((에러,결과) =>{
        console.log(결과)
        응답.render('search.ejs',{ posts : 결과})
    })
    
});


app.get('/list',function(요청,응답){
    
    //디비에 저장된 post라는 collection안의 모든 데이터를 꺼내주세요
    db.collection('post').find().toArray(function(에러,결과){
    console.log(결과); 
    응답.render('list.ejs', {posts : 결과});  
    });
});  


app.get('/detail/:id',function(요청,응답){
    db.collection('post').findOne({_id: parseInt(요청.params.id) },function(에러,결과){
        console.log(결과); 
        응답.render('detail.ejs',{ data : 결과}) 
    })
    

 
})
app.get('/edit/:id',function(요청,응답){
    db.collection('post').findOne({_id: parseInt(요청.params.id)},function(에러,결과){
        console.log(결과) 
        응답.render('edit.ejs',{post : 결과});
    })
    
     
})
app.put('/edit', function(요청,응답){
    //폼에담긴 제목데이터 , 날짜데이터를 가지고 db.collection에다가 업데이트함
    db.collection('post').updateOne({_id : parseInt(요청.body.id) },{ $set : {제목 : 요청.body.title,
        날짜: 요청.body.date}},function(에러,결과){
            console.log('수정완료') 
            응답.redirect('/list') 
    }) 
 
});


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
// 미들웨어 사용하는방법. 미들웨어란? 페이지를 요청하는중간에 실행할 코드
app.use(session({secret : '비밀코드', resave : true , saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/login',function(요청,응답){
    응답.render('login.ejs');

});
app.post('/login',passport.authenticate('local',{ 
    failureRedirect: '/fail'
}),function(요청,응답){
    응답.redirect('/');

});
app.get('/fail',function(요청,응답){
    응답.render('fail.ejs');
      
}); 
app.get('/mypage',로그인했니,function(요청,응답){
    
    요청.user
    console.log(요청.user);
응답.render('mypage.ejs',{사용자:요청.user})

})

function 로그인했니(요청,응답,next){
    if (요청.user){
        next()
    } else {
        응답.send('로그인안하셨는데요?')
    }
}

passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false,
  }, function (입력한아이디, 입력한비번, done) {
    console.log(입력한아이디, 입력한비번);
    db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
      if (에러) return done(에러)
  
      if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
      if (입력한비번 == 결과.pw) {
        return done(null, 결과)
      } else {
        return done(null, false, { message: '비번틀렸어요' })
      }
    }) 
  }));

  passport.serializeUser(function(user,done){
    done(null, user.id)

  });

  passport.deserializeUser(function(아이디,done){
    //디비에서 위에있는 user.id로 유저를 찾은 뒤에 유저정보를 
    db.collection('login').findOne({id:아이디},function(에러,결과){
        done(null,결과)
    })
    
  });

  app.post('/register',function(요청,응답){
      db.collection('login').insertOne({ id : 요청.body.id, pw : 요청.body.pw },function(에러,결과){
          응답.redirect('/')
      })
  })
  //어떤사람이 /add 경로로 pst요청을하면 ??를해주세요.__dirname
app.post('/add',(요청,응답) => {
    
    응답.send('<a>전송완료</a>')
    
    db.collection('counter').findOne({name : '게시물갯수'},function(에러,결과){
        console.log(결과.totalPost); 
        
        var 총게시물갯수 = 결과.totalPost;  
        var 저장할거 = { _id : 총게시물갯수 + 1,제목 : 요청.body.title, 날짜 : 요청.body.date , 작성자 : 요청.user._id}
        db.collection('post').insertOne(저장할거,function(에러,결과){
            console.log('저장완료');
            //counter라는 콜렉션에 있는 totalPost라는 항목도 1 증가시켜야함 (수정)
            db.collection('counter').updateOne({name : '게시물갯수'},{ $inc : {totalPost:1}},function(에러,결과){
                if(에러) {return console.log(에러)}
                console.log(결과)   
            });
       })
    
    });
    
    });   
    app.delete('/delete',function(요청,응답){
        console.log('삭제요청들어옴');
        console.log(요청.body);
        요청.body._id = parseInt(요청.body._id);
    
        var 삭제할데이터 = { _id : 요청.body._id, 작성자 : 요청.user._id }
    
        //삭제할 데이터 요청.body에 담겨온  게시물번호를 가진 글을 db에서 찾고 현재로그인 중인 유저_id가작성자와  같으면 삭제해주세요.
        db.collection('post').deleteOne(삭제할데이터 ,function(에러, 결과){
            console.log('삭제완료'); 
            if (결과.deleteCount==0) {console.log('삭제실패')}
            응답.status(200).send({ message : '성공했다.'});
        })
    });
    