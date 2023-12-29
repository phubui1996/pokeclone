import { useState} from 'react'
import { Outlet } from 'react-router'

import pokeLogo from './assets/pokelogo.png'
import HomePage from './pages/HomePage'
import Navbar from './components/NavBar'


function App() {

const [isLoggedIn, setIsLoggedIn] = useState(false)
const [user, setUser] = useState([])


  return (
    <>
      <Navbar user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Outlet context={{isLoggedIn, setIsLoggedIn, user, setUser}}/>  
    </>
  )
}

export default App
