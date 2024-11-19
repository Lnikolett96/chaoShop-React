import apiClient from "../components/utils/appClient"

export function signUp ( user, profilePic ) {
    const body = new FormData()
    body.append("name", user.name)
    body.append("email", user.email)
    body.append("password", user.password)
    body.append("deliveryAddress", user.deliveryAddress)
    body.append("profilePic", profilePic)

    return apiClient.post('/user/signup', body)
}