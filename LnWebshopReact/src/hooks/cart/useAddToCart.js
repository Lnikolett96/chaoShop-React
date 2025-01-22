import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCartApi } from "../../services/cartServices";

const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, quantity }) => addToCartApi(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"], // A kosár adatok újrahúzása a backendről
      });
    },
    onError: (error, variables, context) => {
      // Hiba esetén visszaállítjuk a kosarat az eredeti állapotra
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },
  });
};

export default useAddToCart;