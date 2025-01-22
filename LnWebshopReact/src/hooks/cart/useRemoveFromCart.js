import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCartApi } from "../../services/cartServices";

const useRemoveFromCart = () => {

    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({id}) => removeFromCartApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            })
        },
        onError: (error, variables, context) => {
            // Hiba esetén visszaállítjuk a kosarat az eredeti állapotra
            if (context?.previousCart) {
              queryClient.setQueryData(["cart"], context.previousCart);
            }
          }
    })
}
export default useRemoveFromCart;