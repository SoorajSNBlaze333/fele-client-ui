import { ORGANIZATION_CHANNELS, ORGANIZATION_NETWORKS, ORGANIZATION_USERS } from "@/config/routes"
import API from "@/lib/API"
import { getItem } from "@/lib/Storage"

export const getOrganizationNetworks = async() => {
  return API.get(ORGANIZATION_NETWORKS, { headers: { Authorization: getItem("token") }})
    .then(response => response)
    .catch(error => { throw new Error(error) })
}

export const getOrganizationChannels = async(network) => {
  return API.get(ORGANIZATION_CHANNELS, { headers: { network, Authorization: getItem("token") }})
    .then(response => response)
    .catch(error => { throw new Error(error) })
}

export const getOrganizationUsers = async() => {
  return API.get(ORGANIZATION_USERS, { headers: { Authorization: getItem("token") }})
    .then(response => response)
    .catch(error => { throw new Error(error) })
}