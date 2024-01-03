import { useState} from 'react'
import { Outlet } from 'react-router'
import Navbar from './components/NavBar'


function App() {

const [isLoggedIn, setIsLoggedIn] = useState(false)
const [user, setUser] = useState([])
const [pokeTeam, setPokeTeam] = useState([])
const [pokedex, setPokedex] = useState([])


  return (
    <>
      <Navbar user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Outlet context={{isLoggedIn, setIsLoggedIn, user, setUser, pokeTeam, setPokeTeam, pokedex, setPokedex}}/>  
    </>
  )
}

export default App
