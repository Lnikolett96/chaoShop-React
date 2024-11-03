import React, { useState, useEffect } from 'react'
import appClient from '../components/utils/appClient'

const useData = (url) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState("")
  
    useEffect(() => {
      const getData = async () => {
        try {
          const response = await appClient.get(url)
          setData(response.data)
        } catch (error) {
          setError(error)
        }
      }
  
      getData()
    }, [])
    return { data, error }
}

export default useData
