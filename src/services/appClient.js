import axios from 'axios';
import { APP_URL } from './apiPath';
import { getStoredUser } from '../utils/storage';

const commonClient = axios.create({
    baseURL: APP_URL,
});

commonClient.interceptors.request.use(
    (config) => {
        const currentUser = getStoredUser('local');
        if (currentUser?.token) {
            config.headers['authorization'] = `Bearer ${ currentUser.token }`;
        }
        const method = config.method.toLowerCase();
        if (method === 'post' || method === 'put' || method === 'patch') {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            if (config.data && typeof config.data === 'object') {
                config.data = new URLSearchParams(config.data).toString();
            }
        } else if (method === 'get' || method === 'delete') {
            config.params = { ...config.params };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default commonClient;