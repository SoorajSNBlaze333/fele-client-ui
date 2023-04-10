import { LOGIN } from "@/config/routes";
import API from "@/lib/API";

export const login = async(credentials) => {
  return API.post(LOGIN, { ...credentials, organization: "nasa" })
    .then(response => response) // TODO get the jwt token and store in local storage
    .catch(error => { throw new Error(error) })
}

export const logout = () => {
  // TODO Clear the localstorage
}