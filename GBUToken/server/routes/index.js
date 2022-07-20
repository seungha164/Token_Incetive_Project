const express = require('express');
const router = express.Router();
var mysql = require('mysql');

let connection = mysql.createConnection({  //mysql연결하기위함
    host: 'tutorial-db-instance.cdxlvvw9k0vr.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password: 'qkdGcr5%',
    database: 'user_db'
});

connection.connect(function (err) {          // mysql 연결
    if (err) console.error('mysql connection error : ' + err);
    else console.log('mysql is connected successfully!');
});
router.get('/test', function (req, res) {
    console.log('test');
})
router.get('/check', function (req, res) {
    connection.query("select * from user", function (err, result) {
        if (err) console.log(err);
        else {
            console.log(result);
        }
    })
})
router.post('/checkid', function (req, res) {  // client(signup_page.js)에서 이경로로 fetch햇따
    let user_id = req.body.id;     //req는 데이터를 받은건데 ①에서 data객체를 보내줫었다

    console.log(req.body.id);
    let sql = 'select id from user where id=?' //sql 쿼리문-> id 에맞는 row들고 오고싶다
    connection.query(sql, [user_id], function (err, rows, fields) {
        console.log(rows);
        let checkid = new Object();
        checkid.tf = false;              // 이 아이디를 사용가능 한가요??

        if (rows[0] === undefined) { //중복되는게 없으면 (없으니까 못가져왓겠지)
            checkid.tf = true;  //없음 사용가능 
        }
        else {
            checkid.tf = false; // 중복됨 사용x 
        }
        res.send(checkid); //다시 클라이언트로 보낸다 checkid 객체를
    })
})
module.exports = router;