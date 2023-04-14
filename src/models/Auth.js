import { LOGIN } from "@/config/routes";
import API from "@/lib/API";
import { removeItem, setItem } from "@/lib/Storage";

export const login = async(credentials) => {
  return API.post(LOGIN, credentials, { headers: { organization: credentials.organization }})
    .then(data => data.token)
    .then(token => setItem("token", token)) // TODO get the jwt token and store in local storage
    .catch(error => { throw new Error(error) })
}

export const verifyToken = async(token) => {
  return API.get(LOGIN, token)
    .then(response => response.isValid)
    .catch(error => { throw new Error(error) })
}

export const logout = () => removeItem("token");