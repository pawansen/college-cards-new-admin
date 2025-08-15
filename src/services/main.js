import { apiPath, APP_URL } from './apiPath';
import commonClient from "./appClient";
import commonClientUploadFile from "./appClientUploadFile";

export const login = (reqPayload) => commonClient.post(apiPath.login, reqPayload);
export const getUsers = (reqPayload) => commonClient.get(apiPath.users, { params: reqPayload });
export const getDashboard = () => commonClient.get(apiPath.dashboard, { params: {} });
export const getCoupons = (reqPayload) => commonClient.get(apiPath.coupons, { params: reqPayload });
export const getCities = (reqPayload) => commonClient.get(apiPath.cities, { params: reqPayload });
export const createCoupon = (reqPayload) => commonClientUploadFile.post(apiPath.createCoupon, reqPayload);
export const getPromoCode = (reqPayload) => commonClient.get(apiPath.promoCodes, { params: reqPayload });
