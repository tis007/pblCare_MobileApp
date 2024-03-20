import { useState, useEffect } from "react";
import axios from "axios";

// Import request values
import { API_KEY } from '@env';
import Device from "../modules/Device";
import UserToken from "../modules/UserToken";
import Encryption from "../modules/Encryption";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    //Get api key
    const api_key = API_KEY;

    try {
      const [storedDeviceNumber, storedUserToken] = await axios.all([
        Device.getDeviceNumber(),
        UserToken.getUserToken(),
      ]);

      //Encrypt data
      const apiKeyEnctypted = Encryption.encrypt(api_key);
      const storedUserTokenEncrypted = Encryption.encrypt(storedUserToken);
      const storedDeviceNumberEncrypted = Encryption.encrypt(storedDeviceNumber);

      const options = {
        method: "POST",
        url: `https://pbl.ghimici.co.uk/mobile_api/${endpoint}.api.php`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          mobile_api_key: apiKeyEnctypted,
          user_token: storedUserTokenEncrypted,
          device_number: storedDeviceNumberEncrypted,
          ...query,
        },
      };

      const response = await axios.request(options);
      console.log("Request headers:", options.headers);

      setData(response.data.data);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
