
import CryptoJS from 'react-native-crypto-js';

const Encryption = {

  encrypt: (plainText) => {
    const secret_key = "r4u7x!A%C*F-JaNdRgUkXp2s5v8y/B?E";
    const iv = CryptoJS.lib.WordArray.random(16); // Generate a random IV

    try {
      const encrypted = CryptoJS.AES.encrypt(
        plainText,
        CryptoJS.enc.Utf8.parse(secret_key),
        { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
      ).toString();

      // Combine IV and ciphertext
      const combinedData = CryptoJS.lib.WordArray.create();
      combinedData.concat(iv);
      combinedData.concat(CryptoJS.enc.Base64.parse(encrypted));

      return combinedData.toString(CryptoJS.enc.Base64);
    } catch (error) {
      throw new Error('Failed to encrypt data');
    }
  },

  decrypt: (encryptedText) => {
    const secret_key = "r4u7x!A%C*F-JaNdRgUkXp2s5v8y/B?E";
  
    // Extract IV and ciphertext
    const combinedData = CryptoJS.enc.Base64.parse(encryptedText);
    const iv = combinedData.clone();
    iv.sigBytes = 16; // Set IV length
    iv.clamp();
  
    const ciphertext = combinedData.clone();
    ciphertext.words.splice(0, 4); // Remove IV from ciphertext
    ciphertext.sigBytes -= 16; // Adjust ciphertext length
  
    try {
      const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: ciphertext },
        CryptoJS.enc.Utf8.parse(secret_key),
        { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
      ).toString(CryptoJS.enc.Utf8);
      return decrypted;
    } catch (error) {
      throw new Error('Failed to decrypt data');
    }
  },
};

export default Encryption;
