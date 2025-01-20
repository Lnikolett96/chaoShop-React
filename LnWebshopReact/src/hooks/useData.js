import appClient from '../components/utils/appClient'
import { useQuery } from '@tanstack/react-query'

const useData = (endpoint, customConfig = {}, queryKey, staleTime = 300_000) => {
  const fetchFunction = () => appClient.get(endpoint, customConfig).then(res => res.data) 
  return useQuery({
    queryKey: [queryKey],
    queryFn: fetchFunction,
    staleTime: staleTime

   })
}

export default useData
