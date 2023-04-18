// const BASE_URL = "http://localhost:8005";
const BASE_URL = "http://10.91.69.228:8005";
const LOCAL_ROUTES = "/api/localorganization";
const ASSET_ROUTES = "/api/fele/asset";
const CHAINCODE_ROUTES = "/api/fele/chaincode";

export const LOGIN = BASE_URL + LOCAL_ROUTES + "/login";
export const SYNC_ORG = BASE_URL + LOCAL_ROUTES + "/sync";
export const ORGANIZATION_NETWORKS = BASE_URL + LOCAL_ROUTES + "/network/list";
export const ORGANIZATION_CHANNELS = BASE_URL + LOCAL_ROUTES + "/channels/list";

export const ORGANIZATION_USERS = BASE_URL + LOCAL_ROUTES + "/get-all-users";
export const ORGANIZATION_FELE_USERS = BASE_URL + LOCAL_ROUTES + "/channel/feleusers/list";

export const ADD_LOCAL_USER = BASE_URL + LOCAL_ROUTES + "/add-user";
export const DELETE_LOCAL_USER = (username) => `${BASE_URL}${LOCAL_ROUTES}/delete-user/${username}`;

export const ORGANIZATION_MAPPINGS = BASE_URL + LOCAL_ROUTES + "/mappings";
export const ADD_MAPPING = BASE_URL + LOCAL_ROUTES + "/mappings/add";
export const DELETE_MAPPING = BASE_URL + LOCAL_ROUTES + "/mappings/delete";

export const CREATE_ASSET = BASE_URL + ASSET_ROUTES + "/create-asset";
export const GET_ASSETS = BASE_URL + ASSET_ROUTES + "/read-assets";

export const INVOKE_CHAINCODE = BASE_URL + CHAINCODE_ROUTES + "/invoke-chaincode"

