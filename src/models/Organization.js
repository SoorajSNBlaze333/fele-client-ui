import { ADD_LOCAL_USER, ADD_MAPPING, DELETE_LOCAL_USER, ORGANIZATION_CHANNELS, ORGANIZATION_FELE_USERS, ORGANIZATION_MAPPINGS, ORGANIZATION_NETWORKS, ORGANIZATION_USERS } from "@/config/routes"
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

export const addLocalUser = async(credentials) => {
  return API.post(ADD_LOCAL_USER, credentials, { headers: { Authorization: getItem("token") }})
    .then(response => response)
    .catch(error => { throw new Error(error) })
}

export const deleteLocalUser = async(username) => {
  return API.delete(DELETE_LOCAL_USER(username), { headers: { Authorization: getItem("token") }})
    .then(response => response)
    .catch(error => { throw new Error(error) })
}

export const fetchLocalOrganizationMappings = async(network, channel) => {
  return API.get(ORGANIZATION_MAPPINGS, { headers: { Authorization: getItem("token"), network, channel }})
    .then(response => response)
    .catch(error => { throw new Error(error) })
}

export const fetchFeleUsers = async(network, channel) => {
  return API.get(ORGANIZATION_FELE_USERS, { headers: { Authorization: getItem("token"), network, channel }})
    .then(response => response)
    .catch(error => { throw new Error(error) })
}

export const addMapping = async(mapping) => {
  return API.post(ADD_MAPPING, mapping, { headers: { Authorization: getItem("token") }})
    .then(response => response)
    .catch(error => { throw new Error(error) })
}