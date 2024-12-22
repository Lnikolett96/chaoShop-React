import appClient from "../components/utils/appClient";

export const addToCartApi = (productId, quantity) => {
    return appClient.post(`/cart/${productId}`, {quantity: quantity})
}

export const getCartApi = () => {
    return appClient.get('/cart')
}

export const removeFromCartApi = (productId) => {
    return appClient.patch(`/cart/remove/${productId}`)
}

export const increaseProductApi = (productId) => {
    return appClient.patch(`/cart/increase/${productId}`)
}

export const decreaseProductApi = (productId) => {
    return appClient.patch(`/cart/decrease/${productId}`)
}
