import { useState} from 'react'
import { Outlet } from 'react-router'
import RegisterPage from './pages/RegisterPage'
import LogIn from './components/Login'
import SignUp from './components/SignUp'
import pokeLogo from './assets/pokelogo.png'
import HomePage from './pages/HomePage'

function App() {
const [boolean, setBoolean] = useState(false)
const [login, setLogin] = useState(false)
const [user, setUser] = useState([])

const LoggingOut = () => {
  window.location.href = '/'
  setBoolean(false)
}

  return (
    <>
    {boolean ? (
      <div>
      <Outlet />
      <button onClick={() => LoggingOut()}>LogOut</button>
      </div>
    ) : (
      <div>
        <img id='logo' src={pokeLogo}></img>
          <RegisterPage />
          {login ? (
            <div>
            <button onClick={() => setLogin(false)}>Sign Up</button>
            <LogIn />
            </div>
          ) : (
            <div>
            <button onClick={() => setLogin(true)}>Log In</button>
            <SignUp />
            </div>
          )}
          <button onClick={() => setBoolean(true)}>User</button>
      </div>
    )}
    </>
  )
}

export default App
