import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import Routing from './components/Routing/Routing'
import { getUser } from './services/useServices'


const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    try {
      const jwtUser = getUser()

      if (Date.now() >= jwtUser.exp * 1000) {
        
        localStorage.removeItem("token")
        location.reload()

      } else {
        setUser(jwtUser)

      }
      
    } catch (error) {
      
    }
  }, [])
  return (
    <div className='app'>
      <Navbar user={user} />
      <main>
        <Routing />
      </main>

    </div>
  )
}

export default App
