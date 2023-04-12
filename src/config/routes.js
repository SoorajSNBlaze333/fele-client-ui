const BASE_URL = "http://localhost:8005";
// const FELE_ROUTES = "/api/fele";
const LOCAL_ROUTES = "/api/localorganization";

export const LOGIN = BASE_URL + LOCAL_ROUTES + "/login";
export const ORGANIZATION_NETWORKS = BASE_URL + LOCAL_ROUTES + "/network/list";
export const ORGANIZATION_CHANNELS = BASE_URL + LOCAL_ROUTES + "/channels/list";

export const ORGANIZATION_USERS = BASE_URL + LOCAL_ROUTES + "/get-all-users";