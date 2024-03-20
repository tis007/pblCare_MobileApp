import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./EndSessionStyle";
import { icons, COLORS } from "../../../constants";
import * as Location from 'expo-location';
import { useRouter } from "expo-router";
import usePost from "../../../hook/usePost";
import SlideButton from 'rn-slide-button';

const EndSession = ({ item }) => {
    const router = useRouter();

    const [location, setLocation] = useState(null);
    const [locationObtained, setLocationObtained] = useState(false);


    if (!item || !item.session_date || !item.session_start) {
        //This is required here to avoid empty session_date error
        return (
            <View style={styles.containerNotAvailable}>
            </View>
        );
    }

    const sessionDate = new Date(item.session_date); // Convert to Date object
    const sessionEnd = item.session_end;
    const sessionCheckOutBeforeEnd = parseInt(item.session_check_out_before_end, 10);
    const sessionCheckOutAfterEnd = parseInt(item.session_check_out_after_end, 10);

    const currentTime = new Date();
    const currentDateString = currentTime.toISOString().split("T")[0]; // Get current date in format YYYY-MM-DD
    const currentTimeString = currentTime.toTimeString().split(" ")[0]; // Get current time in format HH:MM

    const [endHours, endMinutes] = sessionEnd.split(":");
    const checkOutStartTime = new Date(sessionDate);
    checkOutStartTime.setHours(endHours);
    checkOutStartTime.setMinutes(endMinutes - sessionCheckOutBeforeEnd);

    const checkoutEndTime = new Date(sessionDate);
    checkoutEndTime.setHours(endHours);
    checkoutEndTime.setMinutes(endMinutes + sessionCheckOutAfterEnd);

    const canEndSession = true;


    const handleEndSession = async () => {
        if (canEndSession) {

            const endpoint = "sessions/end_session";
            const postData = {
                session_number: item.session_number,
                check_out_lon: location.longitude,
                check_out_lat: location.latitude
            };

            try {
                const checkOutResult = await usePost(endpoint, postData);
                const checkOutResponse = checkOutResult.response;
                // Handle different response scenarios
                switch (checkOutResponse) {
                    case 'successful':
                        alert('Visit ended successfully!');
                        router.push(`/`);
                        break;
                    case 'error_session_cannot_be_ended':
                        alert('Visit cannot be ended at the moment');
                        break;
                    case 'error_system':
                        alert('An error occurred while processing your check out');
                        break;
                    default:
                        alert('An error occurred while processing your check out');
                }
            } catch (error) {
                console.error('Error handling POST request:', error);
                alert('An error occurred while processing your check out');
            }

        } else {
            alert("Visit check out has been closed");
        }
    };

    useEffect(() => {
        const getLocationPermission = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();

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

        getLocationPermission();
    }, []);

    return (
        <View style={styles.container}>
            {canEndSession ? (
                <View style={{ width: '100%' }}>
                <SlideButton
                title="Slide to check out"
                onReachedToEnd={() => handleEndSession()}
                autoReset="true"
                completeThreshold="90"
                icon={<Image source={require('../../../assets/icons/chevron-right-white.png')} style={{ width: 20, height: 20 }} />}
                titleStyle={{
                    color: COLORS.primary,
                }}
                containerStyle={{
                    width: '100%',
                    borderRadius: 0,
                    backgroundColor: COLORS.gray3,
                }}
                thumbStyle={{
                    borderRadius: 20,
                    backgroundColor: COLORS.primary,
                }}
                underlayStyle={{
                    borderRadius: 20,
                    backgroundColor: COLORS.primary
                }}
            />
        </View>
            ) : (
                <View style={styles.containerNotAvailable}>
                    <Text style={styles.textNotAvailable}>
                        Check-out for this visit is closed
                    </Text>
                </View>
            )}
        </View>
    );
};

export default EndSession;
