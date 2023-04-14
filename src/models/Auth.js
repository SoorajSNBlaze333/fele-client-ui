import { LOGIN } from "@/config/routes";
import API from "@/lib/API";
import { removeItem, setItem } from "@/lib/Storage";

export const login = async(credentials) => {
  return API.post(LOGIN, credentials, { headers: { organization: credentials.organization }})
    .then(data => {
      setItem("user", { "username": data.username });
      return data.token;
    })
    .then(token => setItem("token", token))
    .then(() => setItem("organization", { organization: credentials.organization }))
    .catch(error => { throw new Error(error) })
}

export const verifyToken = async(token) => {
  return API.get(LOGIN, token)
    .then(response => response.isValid)
    .catch(error => { throw new Error(error) })
}

export const logout = () => {
  removeItem("token");
  removeItem("organization");
}