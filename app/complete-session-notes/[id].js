import React, { useEffect, useState, useCallback } from "react";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Location from 'expo-location';
import { PatientPanel, ScreenHeaderBtn, CompleteVisitNotesContent } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import usePost from "../../hook/usePost";

const StartSession = () => {
    const params = useSearchParams();
    const router = useRouter();

    const [refreshing, setRefreshing] = useState(false);

    const { data, isLoading, error, refetch } = useFetch("sessions/get_session", {
        session_number: params.id,
    });

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch()
        setRefreshing(false)
    }, []);


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
                    headerTitle: "Complete visit notes",
                }}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
                            item={data[0]}
                        />

                        <CompleteVisitNotesContent
                            item={data[0]}
                        />
                        
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default StartSession;
