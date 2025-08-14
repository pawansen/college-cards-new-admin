import { apiPath, APP_URL } from './apiPath';
import commonClient from "./appClient";

export const login = (reqPayload) => commonClient.post(apiPath.login, reqPayload);
export const getUsers = (reqPayload) => commonClient.get(apiPath.users, { params: reqPayload });
export const getDashboard = () => commonClient.get(apiPath.dashboard, { params: {} });
export const getCoupons = (reqPayload) => commonClient.get(apiPath.coupons, { params: reqPayload });