import { ADD_LOCAL_USER, ADD_MAPPING, DELETE_LOCAL_USER, DELETE_MAPPING, ORGANIZATION_CHANNELS, ORGANIZATION_FELE_USERS, ORGANIZATION_MAPPINGS, ORGANIZATION_NETWORKS, ORGANIZATION_USERS, SYNC_ORG } from "@/config/routes"
import API from "@/lib/API"
import { getItem } from "@/lib/Storage"

const beforeRequest = () => {
  const { organization, network, channel } = getItem("organization");
  const headers = { Authorization: getItem("token"), organization, network, channel };
  return {
    headers,
    organization,
    network,
    channel
  }
}

const handleError = (error) => { throw new Error(error) };

const sync = async() => {
  const { headers } = beforeRequest();
  return API.get(SYNC_ORG, { headers });
} 

export const getOrganizationNetworks = async() => {
  const { headers } = beforeRequest();
  const synced = await sync();
  return API.get(ORGANIZATION_NETWORKS, { headers })
    .catch(handleError)
}

export const getOrganizationChannels = async(network) => {
  const { headers } = beforeRequest();
  return API.get(ORGANIZATION_CHANNELS, { headers: { ...headers, network } })
    .catch(handleError)
}

export const getOrganizationUsers = async() => {
  const { headers } = beforeRequest();
  const synced = await sync();
  return API.get(ORGANIZATION_USERS, { headers })
    .catch(handleError)
}

export const addLocalUser = async(credentials) => {
  const { headers } = beforeRequest();
  return API.post(ADD_LOCAL_USER, credentials, { headers })
    .catch(handleError)
}

export const deleteLocalUser = async(username) => {
  const { headers } = beforeRequest();
  return API.delete(DELETE_LOCAL_USER(username), { headers })
    .catch(handleError)
}

export const fetchLocalOrganizationMappings = async() => {
  const { headers } = beforeRequest();
  const synced = await sync();
  return API.get(ORGANIZATION_MAPPINGS, { headers })
    .catch(handleError)
}

export const fetchFeleUsers = async() => {
  const { headers } = beforeRequest();
  const synced = await sync();
  return API.get(ORGANIZATION_FELE_USERS, { headers })
    .catch(handleError)
}

export const addMapping = async(mapping) => {
  const { headers } = beforeRequest();
  return API.post(ADD_MAPPING, mapping, { headers })
    .catch(handleError)
}

export const deleteMapping = async(username) => {
  const { headers } = beforeRequest();
  return API.delete(DELETE_MAPPING, { headers, params: { username } })
    .catch(handleError)
}