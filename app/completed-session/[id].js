import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Linking } from 'react-native';
import Encryption from "../../modules/Encryption";

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import {
  PatientPanel,
  VisitDetails,
  PatientDetails,
  StartSession,
  JobTabs,
  ScreenHeaderBtn,
  Tasks,
  History,
  CompleteTasks,
  VisitNotes,
  CompleteVisitNotes,
  EndSession
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const tabs = ["Visit", "Patient", "Tasks", "Notes", "History"];

const ActiveSession = () => {
  const params = useSearchParams();
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch("sessions/get_session", {
    session_number: params.id,
  });

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
    setRefreshing(false)
  }, []);


  const displayTabContent = () => {
    switch (activeTab) {
      case "Patient":
        return (
          <PatientDetails
            item={data[0]}
          />
        );

      case "Visit":
        return (
          <VisitDetails item={data[0]} />
        );

        case "Notes":
        return (
          <VisitNotes item={data[0]} />
        );

      case "Tasks":
        return (
            <Tasks
            item={data[0]}
          />
        );

      case "History":
        return (
          <History
          item={data[0]}
        />
        );

      default:
        return null;
    }
  };

  const openGoogleMapsNavigation = () => {
    const address = 
        Encryption.decrypt(data[0].patient_address_line_1) + " " + 
        Encryption.decrypt(data[0].patient_address_line_2) + " " + 
        Encryption.decrypt(data[0].patient_address_line_3) + " " + 
        Encryption.decrypt(data[0].patient_address_city) + " " + 
        Encryption.decrypt(data[0].patient_address_county) + " " + 
        Encryption.decrypt(data[0].patient_address_postcode);
    const formattedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
  
    Linking.openURL(googleMapsUrl)
      .catch((error) => console.error('Error opening Google Maps:', error));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn 
                iconUrl={icons.location} 
                dimension='60%' 
                handlePress={() => openGoogleMapsNavigation()}/>
          ),
          headerTitle: data && data[0] && data[0].session_state === "active" ? "Incomplete visit" : 
                   data && data[0] && data[0].session_state === "in_progress" ? "Visit in Progress" :
                   data && data[0] && data[0].session_state === "completed" ? "Completed visit" : "",
        }}
      />

      <>
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <PatientPanel
                item = {data[0]}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        
        {!isLoading && data && data.length > 0 && data[0].session_state === "active" && <StartSession item={data[0]} />}
        {!isLoading && data && data.length > 0 && data[0].session_state === "in_progress" && data[0].progress_tasks === "false" && <CompleteTasks item={data[0]} />}
        {!isLoading && data && data.length > 0 && data[0].session_state === "in_progress" && data[0].progress_tasks === "true" && data[0].progress_notes === "false" && <CompleteVisitNotes item={data[0]} />}
        {!isLoading && data && data.length > 0 && data[0].session_state === "in_progress" && data[0].progress_tasks === "true" && data[0].progress_notes === "true" && <EndSession item={data[0]} />}
      </>
    </SafeAreaView>
  );
};

export default ActiveSession;
