import React, {useCallback, useEffect, useState} from "react";
import {Stack, useLocalSearchParams, useRouter} from "expo-router";
import {
    ActivityIndicator,
    Alert,
    Platform,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {Camera, CameraView} from 'expo-camera';
import * as Location from 'expo-location';
import {COLORS, icons, SIZES} from "../../constants";
import useFetch from "../../hook/useFetch";
import usePost from "../../hook/usePost";
import {PatientPanel, ScreenHeaderBtn} from "../../components";

const StartSession = () => {
    const params = useLocalSearchParams();
    const router = useRouter();

    const [refreshing, setRefreshing] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [location, setLocation] = useState(null);
    const [locationObtained, setLocationObtained] = useState(false);
    const [cameraPermissionGranted, setCameraPermissionGranted] = useState(null);

    const {data, isLoading, error, refetch} = useFetch("sessions/get_session", {
        session_number: params.id,
    });

    const handleBarCodeScanned = async ({type, data}) => {
        setScanned(true);

        const endpoint = "sessions/start_session";
        const postData = {
            qr_code: data,
            session_number: params.id,
            check_in_lon: location.longitude,
            check_in_lat: location.latitude
        };

        try {
            const qrCodeResult = await usePost(endpoint, postData);
            const qrCodeResponse = qrCodeResult.response;
            // Handle different response scenarios
            switch (qrCodeResponse) {
                case 'successful':
                    alert('Session started successfully!');
                    router.push(`/home`);
                    router.push(`/active-session/${params.id}`);
                    break;
                case 'error_qr_code':
                    alert('Incorrect patient QR code');
                    break;
                case 'error_session_cannot_be_started':
                    alert('Session cannot be started at the moment');
                    break;
                case 'error_system':
                    alert('An error occurred while processing your check in');
                    break;
                default:
                    alert('An error occurred while processing your check in');
            }
        } catch (error) {
            console.error('Error handling POST request:', error);
            alert('Failed to process the QR code result');
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, []);

    useEffect(() => {
        if (scanned) {
            setScanned(false);
        }
    }, [scanned]);

    useEffect(() => {
        const getLocationPermission = async () => {
            try {
                const {status} = await Location.requestForegroundPermissionsAsync();

                if (status !== 'granted') {
                    throw new Error('Location permission not granted');
                }

                const locationSubscription = Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.High,
                        timeInterval: 5000,
                    },
                    (newLocation) => {
                        setLocation(newLocation.coords);
                        setLocationObtained(true);
                    }
                );

                return () => {
                    if (locationSubscription) {
                        locationSubscription.remove();
                    }
                };
            } catch (error) {
                console.error('Error requesting location permission:', error);
            }
        };

        const getCameraPermission = async () => {
            try {
                console.log(Platform.OS);
                /*
                if (Platform.OS === 'web') {
                  // On web, camera permission is not required
                  setCameraPermissionGranted(true);
                  return;
                }


                 */
                const {status} = await Camera.getCameraPermissionsAsync();

                console.log(status);

                if (status === 'granted') {
                    setCameraPermissionGranted(true);
                } else {
                    // Camera permission not granted, request permission
                    const {status: newStatus} = await Camera.requestCameraPermissionsAsync();

                    if (newStatus === 'granted') {
                        setCameraPermissionGranted(true);
                    } else {
                        setCameraPermissionGranted(false);
                        Alert.alert('Permission required', 'Please grant camera permission to proceed.', [{text: 'OK'}]);
                    }
                }
            } catch (error) {
                console.error('Error requesting camera permission:', error);
            }
        };

        console.log("Requesting permissions...");
        getLocationPermission();
        getCameraPermission();
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
                    headerTitle: "Check in",
                }}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            >
                {isLoading ? (
                    <ActivityIndicator size='large' color={COLORS.primary}/>
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : data.length === 0 ? (
                    <Text>No data available</Text>
                ) : (
                    <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                        <PatientPanel
                            item={{
                                ...data[0],
                                tasks: JSON.stringify(data[0].tasks),
                            }}
                        />
                        {Platform.OS !== 'web' && locationObtained && !scanned && cameraPermissionGranted === true && (
                            <View style={{flex: 1, height: 400}}>
                                <CameraView
                                    style={{flex: 1}}
                                    facing={'back'}
                                    barcodeScannerSettings={{
                                        barcodeTypes: ["qr"],
                                    }}
                                    onBarcodeScanned={handleBarCodeScanned}

                                />
                            </View>
                        )}

                        <View style={{padding: SIZES.medium}}>
                            <Text>Entrez l'ID du QR code :</Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.gray,
                                    padding: SIZES.small,
                                    marginVertical: SIZES.small,
                                }}
                                onChangeText={(text) => setScanned(true) || handleBarCodeScanned({
                                    type: 'manual',
                                    data: text
                                })}
                            />
                            <TouchableOpacity
                                style={{
                                    backgroundColor: COLORS.primary,
                                    padding: SIZES.small,
                                    alignItems: 'center',
                                }}
                                onPress={() => setScanned(false)}
                            >
                                <Text style={{color: COLORS.white}}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default StartSession;
