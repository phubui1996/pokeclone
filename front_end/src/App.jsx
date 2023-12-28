import { useState} from 'react'
import { Outlet } from 'react-router'

import pokeLogo from './assets/pokelogo.png'
import HomePage from './pages/HomePage'
import Navbar from './components/NavBar'
import SignUp from './components/SignUp'

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false)
const [user, setUser] = useState([])

const LoggingOut = () => {
  window.location.href = '/'
  setIsLoggedIn(false)
}

  return (
    <>
      <Navbar user = {user} setUser = {setUser} />

      <Outlet context={{isLoggedIn, setIsLoggedIn, user, setUser}}/>  
    </>
  )
}

export default App
