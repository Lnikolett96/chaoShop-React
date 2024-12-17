import appClient from "./appClient";

const setAuthToken = (token) => {
    if (token) {
        appClient.defaults.headers.common["x-auth-token"] = token
    } else {
        delete appClient.defaults.headers.common["x-auth-token"]
    }
}

export default setAuthToken