import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoutes from './components/ProtectedRoutes'
import { Toaster } from 'sonner'

import Home from './pages/Home'
import LogIn from './pages/LogIn'
import ErrorPage from './pages/ErrorPage'


import AppLayout from './layout/AppLayout'

import sharedRoutes from './pages/routes/sharedRoutes'
import adminRoutes from './pages/routes/adminRoutes'
import pharmaRoutes from './pages/routes/pharmaRoutes'

function App() {

  return (
    <>
      <Toaster position="top-right" closeButton={true} richColors toastOptions={{style: {fontSize: "18px"}}}/>

      <AuthProvider>
        {/* <Router> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LogIn />} />


          <Route element={<ProtectedRoutes allowedRoles={["Admin", "Pharmacist"]}> <AppLayout/> </ProtectedRoutes>}>
            {sharedRoutes()}
            {adminRoutes()}
            {pharmaRoutes()}
          </Route>

          <Route path='*' element={<ErrorPage />} />

        </Routes>
        {/* </Router> */}
      </AuthProvider>
    </>
  )
}

export default App