const BASE_URL = "http://localhost:8005";
// const FELE_ROUTES = "/api/fele";
const LOCAL_ROUTES = "/api/localorganization";

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