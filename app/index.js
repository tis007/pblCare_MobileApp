import React, { useEffect, useState } from 'react';
import { SafeAreaView, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
import Device from '../modules/Device';
import UserToken from '../modules/UserToken';
import { COLORS, SIZES } from "../constants";
import { Stack } from "expo-router";

const Index = () => {
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isConnected === null) return; // Wait for connection status to be determined

    async function checkAndRedirect() {
      if (!isConnected) {
        Alert.alert(
          "No Internet Connection",
          "Please connect to the internet to use this app.",
          [{ text: "OK", onPress: checkAndRedirect }]
        );
        return;
      }

      const deviceStatus = await Device.checkDeviceStatus();
      const userTokenStatus = await UserToken.checkUserTokenStatus();

      // Check device status
      if (deviceStatus === 'successful') {
        // Device status is active
        // Check if user is signed in
        if(userTokenStatus === 'successful'){
          // Redirect to 'home' and reset the navigation stack
          navigation.reset({
            index: 0,
            routes: [{ name: 'home' }],
          });
        } else if(userTokenStatus === 'error_inactive_user_token') {
          // Redirect to 'signIn' and reset the navigation stack
          navigation.reset({
            index: 0,
            routes: [{ name: 'signIn' }],
          });
        }
      } else if (deviceStatus === 'error_inactive') {
        // Inactive device
        // Redirect to 'deviceInactive' and reset the navigation stack
        navigation.reset({
          index: 0,
          routes: [{ name: 'deviceInactive' }],
        });
      } else if (deviceStatus === 'error_banned') {
        // Banned device
        // Redirect to 'deviceBanned' and reset the navigation stack
        navigation.reset({
          index: 0,
          routes: [{ name: 'deviceBanned' }],
        });
      }
    }

    checkAndRedirect();
  }, [navigation, isConnected]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
          options={{
              headerShown: false,
          }}
        />

      <ActivityIndicator size="large" color={COLORS.primary} style={{ paddingTop: SIZES.large * 5 }} />
    </SafeAreaView>
  );
};

export default Index;
