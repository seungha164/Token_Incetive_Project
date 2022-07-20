const express = require('express');             //익스프레스 모듈 가져오기 
const app = express();
const cors = require('cors');                   // domain or port가 다른 서버의 자원을 요청
const bodyParser = require('body-parser');      // POST request data의 body로부터 파라미터 추출
const port = process.env.PORT || 4000;                              //서버포트는 3001번 포트
const route = require('./routes/index');        //router가 있는 곳이다 만들 index.js다
app.use(bodyParser.json());

app.use(cors());
app.use('/', route);
app.listen(port, () => {
    console.log(`express is running on ${port}`);   //익스프레스 연결 확인
})