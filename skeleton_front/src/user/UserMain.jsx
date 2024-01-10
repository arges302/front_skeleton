import { Route, Routes } from 'react-router-dom'
import SignUp from './component/SignUp'
import SignIn from './component/Signin'

const UserMain = () =>{
  return(
    <div>
      <h1>User Main</h1>
      <Routes>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
      </Routes>
    </div>
  )
}

export default UserMain