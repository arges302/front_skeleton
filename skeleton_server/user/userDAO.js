const bcrypt = require('bcrypt')
const getPool = require('../common/pool')
const sql = {
  checkId: 'SELECT * FROM user WHERE email = ?', //중복 확인, ?는 프로그램 데이터가 들어갈 자리
  signup: 'INSERT INTO user(name, email, password) VALUES(?, ?, ?)',
}

// DAO(Data Access Object) - dbms(데이터베이스 연동) 처리

const userDAO = {
  // item - 클라이언트 요청 데이터
  // callback - dbms 가 성공한 후에 호출할 개발자 함수
  signup: async (item, callback) => {
    let conn = null
    try {
      // 정상적으로 실행될 로직
      // pool 에서 connection 획득하고
      conn = await getPool().getConnection()

      console.log('dao', item)

      // email check sql 실행
      const [respCheck] = await conn.query(sql.checkId, item.email)
      console.log('000', respCheck)
      if (respCheck[0]) {
        console.log('1111')
        // 이메일로 select 되는 데이터가 있다면 이미 item.email로 가입된 회원임
        callback({status: 500, message:'사용자가 존재합니다.'})
      }else{
        console.log('2222')
        // 데이터가 없다면 email 중복되지 않는다는 말
        // 회원가입하게 table에 insert 하면된다
        // 유저 password는 hash 문자열로 변형시켜서 저장
        const salt = await bcrypt.genSalt()
        bcrypt.hash(item.password, salt, async(error, hash)=>{
          if(error) callback({status: 500, message:'암호화 실패', error: error})
          else{
            // DB insert
            const [resp] = await conn.query(sql.signup, [item.name, item.email, hash])
            callback({status: 200, message:'OK', data: resp})
          }
        })
      }

    } catch (error) {
      // 에러 발생시 실행될 로직
      return{status: 500, message: '유저 입력 실패', error : error}
    } finally {
      // 마지막에 정상 실행되든, 에러가 발생되든, 마지막에 처리할 로직
      // 사용했던 connection을 pool에 반환해서 다른곳에서 사용
      if(conn !== null) conn.release()
    }
  }
}

module.exports = userDAO