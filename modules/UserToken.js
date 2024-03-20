import AsyncStorage from '@react-native-async-storage/async-storage';
import Device from './Device';
import { API_KEY } from '@env';
import axios from 'axios';
import Encryption from './Encryption';

const USER_TOKEN_KEY = 'userToken';

//Get api key
const api_key = "2cd687de38msh42b6b683d684bcfp17e6c8jsn8417945d6d24";

const UserToken = {
    getUserToken: async () => {
        try {
          // Retrieve user token from AsyncStorage
          const storedUserToken = await AsyncStorage.getItem(USER_TOKEN_KEY);
          return storedUserToken || null;
        } catch (error) {
          console.error('Error getting user token from AsyncStorage:', error);
          return null;
        }
      },
    
      setUserToken: async (userToken) => {
        try {
          // Set user token in AsyncStorage
          await AsyncStorage.setItem(USER_TOKEN_KEY, userToken);
        } catch (error) {
          console.error('Error setting user token in AsyncStorage:', error);
        }
      },
    
      deleteUserToken: async () => {
        try {
          // Remove user token from AsyncStorage
          await AsyncStorage.removeItem(USER_TOKEN_KEY);
        } catch (error) {
          console.error('Error deleting user token from AsyncStorage:', error);
        }
      },

      checkUserTokenStatus: async () => {
        try {
          const storedUserToken = await UserToken.getUserToken();
          const storedDeviceNumber = await Device.getDeviceNumber();
          const endpoint = 'authentication/check_user_token';
    
          //Encrypt data
          const storedUserTokenEnctypted = Encryption.encrypt(storedUserToken);
          const storedDeviceNumberEnctypted = Encryption.encrypt(storedDeviceNumber);
          const apiKeyEncrypted = Encryption.encrypt(api_key);

          const options = {
            method: 'POST',
            url: `https://pbl.ghimici.co.uk/mobile_api/${endpoint}.api.php`,
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              mobile_api_key: apiKeyEncrypted,
              device_number: storedDeviceNumberEnctypted,
              user_token: storedUserTokenEnctypted,
            },
          };
    
          const { data, error } = await axios.request(options);
    
          if (error) {
            throw new Error(`Error checking device status: ${error.message}`);
          }
    
          if (data.status === 'error_inactive_user_token') {
            await UserToken.deleteUserToken();
            return 'error_inactive_user_token';
          } else {
            return data.status;
          }
        } catch (error) {
          console.error('Error checking device status:', error);
          return 'error';
        }
      },

      signIn: async (username, password) => {
        try {
          const storedDeviceNumber = await Device.getDeviceNumber();
          const endpoint = 'authentication/sign_in';
    
          //Encrypt data
          const storedDeviceNumberEnctypted = Encryption.encrypt(storedDeviceNumber);
          const apiKeyEncrypted = Encryption.encrypt(api_key);
          const usernameEncrypted = Encryption.encrypt(username);
          const passwordEncrypted = Encryption.encrypt(password);

          const options = {
            method: 'POST',
            url: `https://pbl.ghimici.co.uk/mobile_api/${endpoint}.api.php`,
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              mobile_api_key: apiKeyEncrypted,
              device_number: storedDeviceNumberEnctypted,
              username: usernameEncrypted,
              password: passwordEncrypted,
            },
          };
    
          const { data, error } = await axios.request(options);
    
          if (error) {
            throw new Error(`Error signing in: ${error.message}`);
          }
    
          if (data.status === 'successful') {
            const userToken = data.user_token;
            await UserToken.setUserToken(userToken);
            return 'successful';

          } else {
            return data.status;

          }
        } catch (error) {
          console.error('Error signing in:', error);
          return 'error';
        }
      },
};

export default UserToken;
