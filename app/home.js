import React, {useCallback, useEffect, useState} from "react";
import {ActivityIndicator, SafeAreaView, ScrollView, Text, View} from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
    ScreenHeaderBtn,
    ScreenHeaderLogo,
    MainMenu,
    DatePicker,
    ActiveSessions,
    CompletedSessions, StartSession, AccountPanel
} from "../components";

import { useNavigation } from '@react-navigation/native';
import BackAndProfileHeader from "../components/common/header/BackAndProfileHeader";
import useFetch from "../hook/useFetch";

const Home = () => {
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showActiveSessions, setShowActiveSessions] = useState(true);



    const {data, isLoading, error, refetch} = useFetch("account/get_account");

    console.log("Account data:", data);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch()
        setRefreshing(false)
    }, []);


    useEffect(() => {
        refetch();
    }, [selectedDate]);

  // Handler function for menu icon press
  const handleMenuIconPress = () => {
    // Toggle the visibility of the menu
    setMenuVisible((prevVisibility) => !prevVisibility);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setShowActiveSessions(false); // Hide the ActiveSessions component
    setTimeout(() => setShowActiveSessions(true), 100); // Show the ActiveSessions component after a short delay
  };

  // Handler function for menu item press
  const handleMenuItemPress = (menuItem) => {
    console.log('Selected Menu Item:', menuItem.label);

    // Redirect user according to the selected menu item
    if (menuItem.id === 1) {
      // Home
      navigation.replace('index');

    } else if (menuItem.id === 2) {
      // My account
      navigation.navigate('account/account');
      
    }else if (menuItem.id === 5) {
      // Sign out
      navigation.reset({
        index: 0,
        routes: [{ name: 'signOut' }],
      });
    }

    // Close the menu
    setMenuVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary}/>
        ) : error ? (
            <Text>Something went wrong</Text>
        ) : data.length === 0 ? (
            <Text>No data available</Text>
        ) : (
           <BackAndProfileHeader profilePicture={data[0].staff_profile_picture} showBackButton={true} showProfileButton={true} />
        )}

        <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.menu}
              dimension='60%'
              handlePress={handleMenuIconPress}
            />
          ),
          headerTitle: () => (
            <ScreenHeaderLogo iconUrl={images.logo} dimension='100%' />
          ),
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <DatePicker selectedDate={selectedDate} onDateChange={handleDateChange} />
          {showActiveSessions && <ActiveSessions key={selectedDate} selectedDate={selectedDate} />}
          <CompletedSessions selectedDate={selectedDate} />
        </View>
      </ScrollView>
      {isMenuVisible && (
        <MainMenu handleMenuItemPress={handleMenuItemPress} />
      )}
    </SafeAreaView>
  );
};

export default Home;
