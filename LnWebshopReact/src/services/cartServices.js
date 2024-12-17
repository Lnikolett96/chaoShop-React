import appClient from "../components/utils/appClient";

export const addToCartApi = (productId, quantity) => {
    return appClient.post(`/cart/${productId}`, {quantity: quantity})
}

export const getCartApi = () => {
    return appClient.get('/cart')
}