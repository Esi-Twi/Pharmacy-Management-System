import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoutes from './components/ProtectedRoutes'
import { Toaster } from 'sonner'

import Home from './pages/Home'
import LogIn from './pages/LogIn'
import ErrorPage from './pages/ErrorPage'

import Dashboard from './pages/Shared/Dashboard'


function App() {

  return (
    <>
      <Toaster position="top-right" richColors toastOptions={{style: {fontSize: "18px"}}}/>

      <AuthProvider>
        {/* <Router> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LogIn />} />

          <Route path='/dashboard'
            element={
              <ProtectedRoutes allowedRoles={["Admin", "Pharmacist"]}>
                <Dashboard />
              </ProtectedRoutes>
            }
          />

          <Route path='admin'
            element={
              <ProtectedRoutes allowedRoles={["Admin"]}>
                <Dashboard />
              </ProtectedRoutes>
            }
          />

          <Route path='pharmacist'
            element={
              <ProtectedRoutes allowedRoles={["Pharmacist"]}>
                <Dashboard />
              </ProtectedRoutes>
            }
          />

          <Route path='*' element={<ErrorPage />} />

        </Routes>
        {/* </Router> */}
      </AuthProvider>
    </>
  )
}

export default App