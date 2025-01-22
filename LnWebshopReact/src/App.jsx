import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Routing from './components/Routing/Routing'
import userContext from './contexts/UserContext'
import cartContext from './contexts/CartContext'
import { ToastContainer, toast } from 'react-toastify'
import { getUser } from './services/useServices'
import setAuthToken from './components/utils/setAuthToken'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import useAddToCart from './hooks/cart/useAddToCart'
import { useGetCart } from './hooks/cart/useGetCart'
import useRemoveFromCart from './hooks/cart/useRemoveFromCart'
import useUpdateCart from './hooks/cart/useUpdateCart'


setAuthToken(localStorage.getItem("token"))

const App = () => {
  const [user, setUser] = useState(null)
  const { data: cart = [], isLoading, error } = useGetCart({
    enabled: !!user
  });
  const addToCartMutation = useAddToCart()
  const removeCartMutation = useRemoveFromCart()
  const updateCartIncreaseMutation = useUpdateCart('increase')
  const updateCartDecreaseMutation = useUpdateCart("decrease")

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
    const oldCart = [...cart]; // Eredeti kosár állapot mentése
  
    addToCartMutation.mutate(
      { id: product._id, quantity },
      {
        onMutate: async () => {
          // Optimista frissítés: helyi kosár módosítása a felhasználó élményének javítására
          const newCart = [...oldCart];
          const productIndex = newCart.findIndex(
            (item) => item.product._id === product._id
          );
  
          if (productIndex === -1) {
            newCart.push({ product, quantity });
          } else {
            newCart[productIndex].quantity += quantity;
          }
  
          queryClient.setQueryData(["cart"], newCart);
  
          return { previousCart: oldCart }; // Az eredeti állapot mentése
        },
        onError: (error, variables, context) => {
          toast.error("Something went wrong!");
          // Visszaállítás a mentett kosár állapotra
          if (context?.previousCart) {
            queryClient.setQueryData(["cart"], context.previousCart);
          }
        },
      }
    );
  };

  const removeFromCart = (id) => {
    removeCartMutation.mutate({id: id})
  }

  const updateCart = (type, id) => {

    if (type === 'increase') {
      updateCartIncreaseMutation.mutate({id})
    } else {
      updateCartDecreaseMutation.mutate({id})
    }
  }

  return (
    <userContext.Provider value={user}>
      <cartContext.Provider value={{cart, addToCart, removeFromCart, updateCart}}>

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
