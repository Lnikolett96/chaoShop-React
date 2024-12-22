import appClient from "../components/utils/appClient";

export function checkoutAPI() {
    return appClient.post('/order/checkout')
}