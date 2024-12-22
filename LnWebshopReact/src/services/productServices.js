import appClient from "../components/utils/appClient";

export const getSuggestionsAPI = (searchterm) => {
    return appClient.get(`/products/suggestions?search=${searchterm}`)
}