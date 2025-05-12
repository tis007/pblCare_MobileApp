import axios from 'axios';
import Device from "../modules/Device";
import UserToken from "../modules/UserToken";
import Encryption from "../modules/Encryption";
import { API_KEY } from '@env';

const usePost = async (endpoint, data) => {
    // Get api key
    const api_key = API_KEY;

    try {
        const [storedDeviceNumber, storedUserToken] = await Promise.all([
            Device.getDeviceNumber(),
            UserToken.getUserToken(),
        ]);

        // Encrypt data
        const apiKeyEncrypted = Encryption.encrypt(api_key);
        const storedUserTokenEncrypted = Encryption.encrypt(storedUserToken);
        const storedDeviceNumberEncrypted = Encryption.encrypt(storedDeviceNumber);

        // Add encrypted data to the request
        data.mobile_api_key = apiKeyEncrypted;
        data.device_number = storedDeviceNumberEncrypted;
        data.user_token = storedUserTokenEncrypted;

        const response = await axios.post(`https://app.pblcare.com/mobile_api/${endpoint}.api.php`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error in usePost:', error);
        throw new Error('Failed to make POST request');
    }
};

export default usePost;