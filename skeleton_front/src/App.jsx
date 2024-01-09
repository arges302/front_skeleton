import { Routes, Route } from 'react-router-dom'

import Header from './home/component/Header'
import Footer from './home/component/Footer'
import Home from './home/component/Home'
import HomeMain from './home/HomeMain'

const App = () => {
  return(
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<HomeMain/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App