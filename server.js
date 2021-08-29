const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

var db;
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://anxiety:anxiety09091@cluster0.tioqv.mongodb.net/todoapp?retryWrites=true&w=majority',function(에러,client){
 
    if(에러){return console.log(에러)}

    db = client.db('todoapp');
    db.collection('post').insertOne({ 이름 : 'john', _id : 100},function(에러,결과){
     console.log('저장완료');
     
    }); 
    app.listen(7080, function(){     
        console.log('listening on 7080')    
        
   
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
// /하나면 홈임
app.get('/',function(요청,응답){
    응답.sendfile(__dirname + '/index.html');

});
app.get('/write',function(요청,응답){
    응답.sendfile(__dirname + '/write.html');

});

//어떤사람이 /add 경로로 pst요청을하면 ??를해주세요.__dirname
app.post('/add',function(요청,응답){
    응답.send('전송완료')
    
    db.collection('post').insertOne({ 제목 : 요청.body.title, 날짜 : 요청.body.date },function(에러,결과){
     console.log('저장완료');
    console.log(요청.body.date);  
    console.log(요청.body.title);   
})});  