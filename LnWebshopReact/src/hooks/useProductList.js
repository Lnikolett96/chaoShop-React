import appClient from '../components/utils/appClient'
import { useInfiniteQuery } from '@tanstack/react-query'

const useProductList = ( query ) => {
  const fetchFunction = ({pageParams = 1 }) => appClient.get("/products", {params: {...query, page: pageParams}}).then(res => res.data) 
  return useInfiniteQuery({
    queryKey: ["products", query],
    queryFn: fetchFunction,
    getNextPageParam: (lastPage, allPages) => {
        return lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : null;
      }
   })
}

export default useProductList;
