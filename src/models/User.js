import { CREATE_ASSET, GET_ASSETS, INVOKE_CHAINCODE } from "@/config/routes";
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

export const invokeChaincode = async(data) => {
  const { headers, network, channel } = beforeRequest();
  const createAssetData = {
    network,
    channel,
    data,
    chaincodeName: "EmployeeAsset",
    chaincodeAction: "createAsset"
  }

  return API.post(INVOKE_CHAINCODE, { ...createAssetData }, { headers })
    .catch(error => { throw new Error(error) })
}

export const getAssets = async() => {
  const { headers } = beforeRequest();

  return API.get(GET_ASSETS, { headers })
    .catch(error => { throw new Error(error) })
}