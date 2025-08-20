import axios from 'axios';
import { APP_URL } from './apiPath';
import { getStoredUser } from '../utils/storage';

const commonClientGuest = axios.create({
    baseURL: APP_URL,
});

commonClientGuest.interceptors.request.use(
    (config) => {
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

export default commonClientGuest;