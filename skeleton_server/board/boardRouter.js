const express = require('express')
const router = express.Router()
const boardDAO = require('./boardDAO')

// 유저 요청이 들어오면 실행
router.get('/boardList', function(req, res, next){
  console.log('success')
  
  boardDAO.boardList((resp)=>{
    console.log('router result:', resp)
    res.json(resp)
  })
})

module.exports = router
// http://localhost:8000/borad/boardlist