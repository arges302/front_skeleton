// 이 파일은 DBMS를 위해 필요한 connection 을 미리 준비하는 파일
// app에서 DB와 연동하기 위해서는 DB에 connection 해야함
// DB 내부적으로 connection은 성능상 상당히 부담스럽다

// 그래서 app 에서  DB  connection 을 한정된 갯수 내에서만 활용할 수 있게
// 보통의 경우 connection pool을 운영하고, 그 pool 의 connection 만 활용하는게 일반적

// 허용인원이 10명인데 20명이 몰리면 pool에서 10명이 대기한다는 개념

// mysql 연동 드라이버
const mysql = require('mysql2/promise')

let pool
// 앱에서 DBMS 작업이 필요하면 이함수를 호출해서 connection 을 얻어 실행
module.exports = function getPool() {
  if(pool){
    return pool
  }
  // 초기 pool구성, 즉 초기 connection 을 원하는 갯수만큼 만들어 유지
  const config = {
    host: process.env.DB_URL,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10
  }
  return mysql.createPool(config)
}