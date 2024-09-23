import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignIn } from './pages/sign-in/SignIn'
import SignUp from './pages/sign-up/SignUp'
import AppNavbar from './pages/dashboard/components/AppNavbar'
import Dashboard from './pages/dashboard/Dashboard'
import AddProject from './pages/addproject/AddProject'

function App() {

  return (
    <>
      <BrowserRouter>
        <AppNavbar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/project/add' element={<AddProject />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
