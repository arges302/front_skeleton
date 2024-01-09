const express = require('express')
const router = express.Router()
const userDAO = require('./userDAO')

// 유저업무와 관련된 요청이 들어왔을때 그요청을 처리하는 역할
router.get('/signup', async (req, res, next) => {
  console.log('user router, signup.......')
  userDAO.signup({name:'박종섭', email:'seob@seob.com', password: '1234'}, (resp) => {
    res.send(resp)
  })
})

module.exports = router

// http://localhost:8000/users/signup