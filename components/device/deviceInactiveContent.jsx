import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "./deviceStyle";
import { COLORS, images } from "../../constants";
import Device from "../../modules/Device";

const DeviceBannedContent = () => {
  const navigation = useNavigation();
  const [deviceNumber, setDeviceNumber] = useState(null);

  useEffect(() => {
    const fetchDeviceNumber = async () => {
      try {
        const number = await Device.getDeviceNumber();
        setDeviceNumber(number);
      } catch (error) {
        console.error('Error fetching device number', error);
      }
    };

    fetchDeviceNumber();
  }, []);

  const handleTryAgain = () => {
    // Navigate to index
    navigation.navigate('index');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoImageContainer}>
        <Image
          source={images.logo}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={styles.textActivate}>Your device needs to be activated</Text>

      <Text style={styles.text}>Please let us know your activation code:</Text>

      {deviceNumber !== null && (
        <View style={styles.activationCodeContainer}>
          <Text style={styles.activationCodeText}>{deviceNumber}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.buttonRefresh} onPress={handleTryAgain}>
        <Text style={styles.buttonRefreshText}>Try again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeviceBannedContent;
