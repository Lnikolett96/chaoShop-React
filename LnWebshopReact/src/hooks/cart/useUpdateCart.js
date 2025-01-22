import { useMutation, useQueryClient } from "@tanstack/react-query"
import { decreaseProductApi, increaseProductApi } from "../../services/cartServices";

const useUpdateCart = (updateActionType) => {
    const queryClient = useQueryClient()
    const mutationFv = updateActionType == 'increase' ? increaseProductApi : decreaseProductApi
    return useMutation({
        mutationFn: ({id}) => mutationFv(id) ,
        onSuccess: queryClient.invalidateQueries({ queryKey: ["cart"]}),
        onError: (error, variables, context) => {
            // Hiba esetén visszaállítjuk a kosarat az eredeti állapotra
            if (context?.previousCart) {
              queryClient.setQueryData(["cart"], context.previousCart);
            }
        }
    })
} 
export default useUpdateCart;