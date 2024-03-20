import React, { useEffect } from 'react';
import { SafeAreaView, ActivityIndicator  } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Device from '../modules/Device';
import UserToken from '../modules/UserToken';
import { COLORS, SIZES } from "../constants";
import { Stack } from "expo-router";

const SignOut = () => {
  const navigation = useNavigation();

  useEffect(() => {
    async function checkAndRedirect() {
      
      //Remove user token
      await UserToken.deleteUserToken();

      //Redirect to 'index' and reset the navigation stack
      navigation.reset({
        index: 0,
        routes: [{ name: 'index' }],
      });
      
      
    }

    checkAndRedirect();
  }, [navigation]);

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

export default SignOut;
