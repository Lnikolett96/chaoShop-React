import React from 'react'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import Routing from './components/Routing/Routing'


const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <main>
        <Routing />
      </main>

    </div>
  )
}

export default App
