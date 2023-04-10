import { ORGANIZATION_CHANNELS, ORGANIZATION_NETWORKS } from "@/config/routes"
import API from "@/lib/API"

export const getOrganizationNetworks = async() => {
  return API.get(ORGANIZATION_NETWORKS, { params: { organization: "nasa" }})
    .then(response => response)
    .catch(error => { throw new Error(error) })
}

export const getOrganizationChannels = async(network) => {
  return API.get(ORGANIZATION_CHANNELS, { params: { organization: "nasa", network }})
    .then(response => response)
    .catch(error => { throw new Error(error) })
}