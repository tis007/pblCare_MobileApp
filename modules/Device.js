import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_KEY } from '@env';
import Encryption from './Encryption';

const DEVICE_NUMBER_KEY = 'deviceNumber';

//Get api key
const api_key = "2cd687de38msh42b6b683d684bcfp17e6c8jsn8417945d6d24";

const Device = {
    getDeviceNumber: async () => {
        try {
          // Retrieve device number from AsyncStorage
          const storedDeviceNumber = await AsyncStorage.getItem(DEVICE_NUMBER_KEY);
          return storedDeviceNumber || null;
        } catch (error) {
          console.error('Error getting device number from AsyncStorage:', error);
          return null;
        }
      },
    
      setDeviceNumber: async (deviceNumber) => {
        try {
          // Set device number in AsyncStorage
          await AsyncStorage.setItem(DEVICE_NUMBER_KEY, deviceNumber);
        } catch (error) {
          console.error('Error setting device number in AsyncStorage:', error);
        }
      },
    
      deleteDeviceNumber: async () => {
        try {
          // Remove device number from AsyncStorage
          await AsyncStorage.removeItem(DEVICE_NUMBER_KEY);
        } catch (error) {
          console.error('Error deleting device number from AsyncStorage:', error);
        }
      },

      checkDeviceStatus: async () => {
        try {
          const storedDeviceNumber = await Device.getDeviceNumber();
          const endpoint = 'authentication/check_device';

          //Encrypt data
          const storedDeviceNumberEnctypted = Encryption.encrypt(storedDeviceNumber);
          const apiKeyEncrypted = Encryption.encrypt(api_key);
    
          const options = {
            method: 'POST',
            url: `https://app.pblcare.com/mobile_api/${endpoint}.api.php`,
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              mobile_api_key: apiKeyEncrypted,
              device_number: storedDeviceNumberEnctypted,
            },
          };
    
          const { data, error } = await axios.request(options);
    
          if (error) {
            throw new Error(`Error checking device status: ${error.message}`);
          }
    
          if (data.status === 'error_device_not_registered') {
            await Device.registerDevice();
            return 'error_inactive';
          } else {
            return data.status;
          }
        } catch (error) {
          console.error('Error checking device status:', error);
          return 'error';
        }
      },
    
      registerDevice: async () => {
        try {
          const endpoint = 'authentication/register_device';

          //Encrypt data
          const apiKeyEncrypted = Encryption.encrypt(api_key);
    
          const options = {
            method: 'POST',
            url: `https://app.pblcare.com/mobile_api/${endpoint}.api.php`,
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              mobile_api_key: apiKeyEncrypted,
            },
          };
    
          const { data, error } = await axios.request(options);
    
          if (error) {
            throw new Error(`Error registering device: ${error.message}`);
          }
    
          if(data.status = "successful"){
            const deviceNumber = data.device_number;
            const deviceNumberDecrypted = Encryption.decrypt(deviceNumber);
            await Device.setDeviceNumber(deviceNumberDecrypted);
          }
    
          return data.status;
        } catch (error) {
          console.error('Error registering device:', error);
          return 'error';
        }
      },
};

export default Device;
