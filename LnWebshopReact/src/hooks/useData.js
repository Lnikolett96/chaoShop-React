import React, { useState, useEffect } from 'react'
import appClient from '../components/utils/appClient'

const useData = (endpoint, customConfig, deps) => {
    const [data, setData] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      const getData = async () => {
        try {
          setLoading(true)
          const response = await appClient.get(endpoint, customConfig)
          if (endpoint === '/products' && data && data.products && customConfig.params.page !== 1) {
            setData(prev => ({
              ...prev, products: [...prev.products, ...response.data.products]
            }))
          } else {
            setData(response.data)
          }
          setLoading(false)
        } catch (error) {
          setError(error)
          setLoading(false)
        }
      }
  
      getData()
    }, deps ? deps : [])
    return { data, error, loading }
}

export default useData
