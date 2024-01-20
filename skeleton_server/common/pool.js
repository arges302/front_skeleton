//이 파일은 dbms 를 위한 필요한 connection 을 미리 준비하는 파일..
//app 에서 db 와 연동하기 위해서는 db 에 connection 해야 한다..
//db 내부적으로 connection 은 성능상 상당히 부담스럽다..

//그래서 app 에서 db connection 을 한정된 갯수내에서만 활용할 수 있게 
//보통의 경우 connection pool 을 운영하고. 그 pool 의 connection 만 활용하게 하는
//것이 일반적이다..

//mysql 연동 드라이버.. 
const mysql = require('mysql2/promise')

let pool
//앱에서 dbms 작업이 필요하면 이 함수를 호출해서.. connection 을 얻어 실행..
module.exports = function getPool() {
  if(pool){
    return pool
  }
  //초기.. pool 구성.. 즉 초기 connection 을 원하는 갯수만큼 만들어서 유지..
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