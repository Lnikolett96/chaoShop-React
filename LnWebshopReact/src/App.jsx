import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Routing from './components/Routing/Routing'
import userContext from './contexts/UserContext'
import cartContext from './contexts/CartContext'
import { ToastContainer, toast } from 'react-toastify'
import { getUser } from './services/useServices'
import setAuthToken from './components/utils/setAuthToken'
import { addToCartApi, decreaseProductApi, getCartApi, increaseProductApi, removeFromCartApi } from './services/cartServices'
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
    const productIndex = updatedCart.findIndex(item => item.product._id === product._id)

    if (productIndex === -1) {
      updatedCart.push({product: product, quantity: quantity})
    } else {
      updatedCart[productIndex].quantity += quantity
    }

    setCart(updatedCart)
    addToCartApi(product._id, quantity).then(res => { toast.success("Product Added Successfully!") }).catch(err => { toast.error(err.message) , setCart(cart) })
  }

  const removeFromCart = (id) => {
    const oldCart = [...cart]
    const newCart = oldCart.filter(item => item.product._id !== id)
    setCart(newCart)
    removeFromCartApi(id).catch(err => {
      toast.error("Something went wrong!")
      setCart(oldCart)
    })
  }

  const updateCart = (type ,id) => {
    const oldCart = [...cart]
    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex(item => item.product._id === id)

    if (type === 'increase') {
      updatedCart[productIndex].quantity += 1
      setCart(updatedCart)
      increaseProductApi(id).catch(err => {
        toast.error('Something went wrong!')
        setCart(oldCart)
      })
    } else {
      updatedCart[productIndex].quantity -= 1
      setCart(updatedCart)
      decreaseProductApi(id).catch(err => {
        toast.error('Something went wrong!')
        setCart(oldCart)
      })
    }
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
    <userContext.Provider value={user}>
      <cartContext.Provider value={{cart, addToCart, removeFromCart, updateCart, setCart}}>

        <div className='app'>
          <Navbar />
          <main>
            <Routing />
            <ToastContainer position='bottom-right' />
          </main>
        </div>

      </cartContext.Provider>
    </userContext.Provider>
  )
}

export default App
