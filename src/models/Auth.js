import API from "@/lib/API";
import { LOGIN, SYNC_ORG } from "@/config/routes";
import { removeItem, setItem } from "@/lib/Storage";

export const login = async(credentials) => {
  return API.post(LOGIN, credentials, { headers: { organization: credentials.organization }})
    .then(data => {
      setItem("user", { "username": data.username, "role": data.role });
      return data.token;
    })
    .then(token => {
      setItem("organization", { organization: credentials.organization });
      setItem("token", token);
      return token;
    })
    .catch(error => { throw new Error(error) })
}

export const verifyToken = async(token) => {
  return API.get(LOGIN, token)
    .then(response => response.isValid)
    .catch(error => { throw new Error(error) })
}

export const logout = () => {
  removeItem("token");
  removeItem("user");
  removeItem("organization");
}