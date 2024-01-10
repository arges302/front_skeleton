// const getPool = require('../common/pool')

// const sql = {
//   boardList: 'SLECT * FROM borad = ?',
//   boardList: 'INSERT INTO board(name, title, content) VALUES(?, ?, ?)',
// }

// const boardDAO = {
//   // 게시물 조회 요청이 들어왓을때 router에 의해 실행 DBMS
//   boardList: async (item, callback) => {
//     const {name, title, content} = item
//     let conn = null
//     try {
//       conn = await getPool().getConnection()
//       console.log('DAO')
//       const[rows]=await conn.query(sql.checkID)
//       console.log('000',respCheck)
//       if (respCheck[0]){
//         console.log('1111')
//         callback({status:200, message:'???'})
//       }
//     } catch (error) {
//       console.log('000')
//       return { status: 500, message: '게시물 조회 불가', error: error }
//     } finally {
//       if (conn !== null) conn.release()
//     }
//   }
// }

// module.exports = boardDAO

// 실패작///////







const getPool = require('../common/pool')

const sql = {
  boardList: 'SELECT * FROM board',
  // boardList: 'INSERT INTO board(name, title, content) VALUES(?, ?, ?)',
}

const boardDAO = {
  // 게시물 조회 요청이 들어왓을때 router에 의해 실행 DBMS
  boardList: async (callback) => {
    // const {name, title, content} = item
    let conn = null
    try {
      conn = await getPool().getConnection()
      console.log('DAO')
      const [rows] = await conn.query(sql.boardList)
      console.log('000', rows)
      callback({ status: 200, message: 'ok', data: rows })
    } catch (error) {
      console.log('000')
      return { status: 500, message: '게시물 조회 불가', error: error }
    } finally {
      if (conn !== null) conn.release()
    }
  }
}

module.exports = boardDAO

