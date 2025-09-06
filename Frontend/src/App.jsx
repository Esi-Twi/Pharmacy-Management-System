import './App.css'
import { Route, Routes } from 'react-router-dom'


import Home from './pages/Home'
import LogIn from './pages/LogIn'
import ErrorPage from './pages/ErrorPage'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<LogIn />}/>

        <Route path='*' element={<ErrorPage />}/>

      </Routes>
    </>
  )
}

export default App