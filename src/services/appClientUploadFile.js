import axios from 'axios';
import { APP_URL } from './apiPath';
import { getStoredUser } from '../utils/storage';

// Do not set Content-Type manually for FormData; let axios handle it
const commonClientUploadFile = axios.create({
    baseURL: APP_URL,
});

commonClientUploadFile.interceptors.request.use(
    (config) => {
        const currentUser = getStoredUser('local');
        if (currentUser?.token) {
            config.headers['authorization'] = `Bearer ${ currentUser.token }`;
        }
        // Only set Content-Type for non-FormData payloads
        if (
            config.data &&
            typeof config.data === 'object' &&
            !(config.data instanceof FormData)
        ) {
            const method = config.method.toLowerCase();
            if (method === 'post' || method === 'put' || method === 'patch') {
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                config.data = new URLSearchParams(config.data).toString();
            }
        }
        // For FormData, do not set Content-Type; axios will set it with boundary
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default commonClientUploadFile;