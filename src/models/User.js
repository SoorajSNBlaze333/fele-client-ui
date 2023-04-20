import { ASSET } from "@/config/constants";
import { CURRENT_USER_MAPPING, INVOKE_CHAINCODE } from "@/config/routes";
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

const getCurrentUserMapping = async() => {
  const { headers } = beforeRequest();
  return API.get(CURRENT_USER_MAPPING, { headers })
    .catch(error => { throw new Error(error) })
}

export const createAsset = async(data) => {
  const { headers, network, channel } = beforeRequest();
  const { feleUser } = await getCurrentUserMapping();
  const createAssetData = {
    network,
    channel,
    data,
    chaincodeName: ASSET,
    chaincodeAction: "createAsset",
    invokerName: feleUser
  }
  return API.post(INVOKE_CHAINCODE, { ...createAssetData }, { headers })
    .catch(error => { throw new Error(error) })
}

export const getAssets = async() => {
  const { headers, network, channel } = beforeRequest();
  const { feleUser } = await getCurrentUserMapping();
  const getAssetData = {
    network,
    channel,
    chaincodeName: ASSET,
    chaincodeAction: "getAllAssets",
    invokerName: feleUser
  }
  return API.get(INVOKE_CHAINCODE, { headers, params: { ...getAssetData }})
    .catch(error => { throw new Error(error) })
}

export const updateAsset = async(assetId, data) => {
  const { headers, network, channel } = beforeRequest();
  const { feleUser } = await getCurrentUserMapping();
  const updateAssetData = {
    network,
    channel,
    assetId,
    data,
    chaincodeName: ASSET,
    chaincodeAction: "updateAsset",
    invokerName: feleUser
  }
  return API.put(INVOKE_CHAINCODE, { headers, params: { ...updateAssetData }})
    .catch(error => { throw new Error(error) })
}

export const deleteAsset = async(assetId) => {
  const { headers, network, channel } = beforeRequest();
  const { feleUser } = await getCurrentUserMapping();
  const deleteAssetData = {
    network,
    channel,
    assetId,
    chaincodeName: ASSET,
    chaincodeAction: "deleteAsset",
    invokerName: feleUser
  }
  return API.delete(INVOKE_CHAINCODE, { headers, params: { ...deleteAssetData }})
    .catch(error => { throw new Error(error) })
}