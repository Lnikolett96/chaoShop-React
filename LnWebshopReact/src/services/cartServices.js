import appClient from "../components/utils/appClient";

export const addToCartApi = (productId, quantity) => {
    return appClient.post(`/cart/${productId}`, {quantity: quantity}).then(res => res.data)
}

export const getCartApi = () => {
    return appClient.get('/cart').then(res => res.data)
}

export const removeFromCartApi = (productId) => {
    return appClient.patch(`/cart/remove/${productId}`).then(res => res.data)
}

export const increaseProductApi = (productId) => {
    return appClient.patch(`/cart/increase/${productId}`).then(res => res.data)
}

export const decreaseProductApi = (productId) => {
    return appClient.patch(`/cart/decrease/${productId}`).then(res => res.data)
}
