import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Routing from './components/Routing/Routing'
import { ToastContainer, toast } from 'react-toastify'
import { getUser } from './services/useServices'
import setAuthToken from './components/utils/setAuthToken'
import { addToCartApi, getCartApi } from './services/cartServices'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'


setAuthToken(localStorage.getItem("token"))

const App = () => {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])

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

  const addToCart = (product, quantity) => {
    const updatedCart = [...cart]
    console.log(updatedCart)
    const productIndex = updatedCart.findIndex(item => item.product._id === product._id)

    if (productIndex === -1) {
      updatedCart.push({product: product, quantity: quantity})
    } else {
      updatedCart[productIndex].quantity += quantity
    }

    setCart(updatedCart)
    addToCartApi(product._id, quantity).then(res => { toast.success("Product Added Successfully!") }).catch(err => { toast.error(err.message) , setCart(cart) })
  }

  const getCart = () => {
    getCartApi().then( res => {setCart( res.data )}).catch(err => {toast.error('Failed To Load the cart!')})
  }

  useEffect(() => {
    if (user) {
      getCart()
    }
  }, [user])

  return (
    <div className='app'>
      <Navbar user={user} cartCount={cart.length} />
      <main>
        <Routing addToCart={addToCart} cart={cart} />
        <ToastContainer position='bottom-right' />
      </main>

    </div>
  )
}

export default App
