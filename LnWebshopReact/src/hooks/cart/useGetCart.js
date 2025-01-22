import { useQuery } from '@tanstack/react-query';
import { getCartApi } from '../../services/cartServices';


export const useGetCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: getCartApi
  });
};