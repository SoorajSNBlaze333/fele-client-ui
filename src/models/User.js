import { CREATE_ASSET, GET_ASSETS } from "@/config/routes";
import API from "@/lib/API";
import { getItem } from "@/lib/Storage";

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

export const createAsset = async(data) => {
  const { headers, network, channel } = beforeRequest();
  const createAssetData = {
    network,
    channel,
    data,
  }

  return API.post(CREATE_ASSET, { ...createAssetData }, { headers })
    .catch(error => { throw new Error(error) })
}

export const getAssets = async() => {
  const { headers } = beforeRequest();

  return API.get(GET_ASSETS, { headers })
    .catch(error => { throw new Error(error) })
}