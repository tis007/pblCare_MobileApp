import React, { useEffect, useState, useCallback } from "react";
import {Stack, useLocalSearchParams, useRouter} from "expo-router";
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { PatientPanel, ScreenHeaderBtn, CompleteTaskContent } from "../../../components";
import { COLORS, icons, SIZES } from "../../../constants";
import useFetch from "../../../hook/useFetch";

const SessionTask = () => {
    const params = useLocalSearchParams();
    const router = useRouter();

    const [refreshing, setRefreshing] = useState(false);

    const session_number = params.session_number;
    const task_number = params.task_number;

    const { data, isLoading, error, refetch } = useFetch("sessions/get_session_task", {
        session_number: session_number,
        task_number: task_number,
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
                    headerTitle: "Complete task",
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

                        <CompleteTaskContent
                            item={data[0]}
                        />
                        
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default SessionTask;
