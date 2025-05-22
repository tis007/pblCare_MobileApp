import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import styles from "./StartSessionStyle";
import {useRouter} from "expo-router";

const StartSession = ({item}) => {
    const router = useRouter();
    if (!item || !item.session_date || !item.session_start) {
        //This is required here to avoid empty session_date error
        return (
            <View style={styles.containerNotAvailable}>
            </View>
        );
    }

    const sessionDate = new Date(item.session_date); // Convert to Date object
    const sessionStart = item.session_start;
    const sessionCheckInBeforeStart = parseInt(item.session_check_in_before_start, 10);
    const sessionCheckInAfterStart = parseInt(item.session_check_in_after_start, 10);

    const currentTime = new Date();
    const currentDateString = currentTime.toISOString().split("T")[0]; // Get current date in format YYYY-MM-DD
    const currentTimeString = currentTime.toTimeString().split(" ")[0]; // Get current time in format HH:MM

    const [startHours, startMinutes] = sessionStart.split(":");
    const checkInStartTime = new Date(sessionDate);
    checkInStartTime.setHours(startHours - Math.floor(sessionCheckInBeforeStart/60));
    checkInStartTime.setMinutes(startMinutes - (sessionCheckInBeforeStart % 60));

    const checkInEndTime = new Date(sessionDate);
    checkInEndTime.setHours(+startHours + Math.floor(sessionCheckInAfterStart/60));
    checkInEndTime.setMinutes(+startMinutes + (sessionCheckInAfterStart % 60));

    const canStartSession =
        currentDateString === sessionDate.toISOString().split("T")[0] &&
        currentTime >= checkInStartTime &&
        currentTime <= checkInEndTime;


    const handleStartSession = () => {
        if (canStartSession) {
            router.push(`/check-in-session/${item.session_number}`);
        } else {
            alert("Visit check in has been closed");
        }
    };

    return (
        <View style={styles.container}>
            {canStartSession ? (
                <TouchableOpacity
                    style={styles.buttonStartSession}
                    onPress={handleStartSession}
                >
                    <Text style={styles.textStartSession}>Check in</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.containerNotAvailable}>
                    <Text style={styles.textNotAvailable}>
                        Check-in for this visit is closed
                    </Text>
                </View>
            )}
        </View>
    );
};

export default StartSession;
