
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import { DeviceBannedContent } from "../components";


const DeviceBanned = () => {

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
            <DeviceBannedContent />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeviceBanned;
