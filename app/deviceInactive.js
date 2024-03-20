import { useState } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, SIZES } from "../constants";

import { DeviceInactiveContent } from "../components";


const DeviceInactive = () => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
            headerShown: false,
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
            alignItems: "center",
          }}
        >
            <DeviceInactiveContent />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeviceInactive;
