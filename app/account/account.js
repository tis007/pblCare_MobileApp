import {Stack, useRouter} from "expo-router";
import {useCallback, useState} from "react";

import {ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View,} from "react-native";

import {AccountPanel, ScreenHeaderBtn} from "../../components";
import {COLORS, icons, SIZES} from "../../constants";
import useFetch from "../../hook/useFetch";

const Account = () => {
    const router = useRouter();

    const {data, isLoading, error, refetch} = useFetch("account/get_account");


    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch()
        setRefreshing(false)
    }, []);


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => <></>, headerTitle: "",
                }}
            />

            <>
                <ScrollView showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                >
                    {isLoading ? (
                        <ActivityIndicator size='large' color={COLORS.primary}/>
                    ) : error ? (
                        <Text>Something went wrong</Text>
                    ) : data.length === 0 ? (
                        <Text>No data available</Text>
                    ) : (
                        <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                            <AccountPanel
                                item={data[0]}
                            />


                        </View>
                    )}
                </ScrollView>
            </>
        </SafeAreaView>
    );
};

export default Account;
