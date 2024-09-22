import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {SignIn} from './pages/sign-in/SignIn'
import SignUp from './pages/sign-up/SignUp'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
