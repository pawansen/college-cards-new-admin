
export const getStoredUser = (storageType = 'session') => {
    try {
        const storage = storageType === 'local' ? localStorage : sessionStorage;
        const user = JSON.parse(storage.getItem('user'));
        return user || false;
    } catch (error) {
        console.error('Error parsing stored user:', error);
        return false;
    }
};
export const getStoredToken = (storageType = 'session') => {
    try {
        const storage = storageType === 'local' ? localStorage : sessionStorage;
        return storage.getItem('token') || false;
    } catch (error) {
        console.error('Error retrieving stored token:', error);
        return false;
    }
};