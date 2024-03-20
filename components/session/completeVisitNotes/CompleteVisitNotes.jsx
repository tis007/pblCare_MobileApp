import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./CompleteVisitNotesStyle";
import { icons } from "../../../constants";
import { useRouter } from "expo-router";
import usePost from "../../../hook/usePost";

const CompleteVisitNotes = ({ item }) => {
    const router = useRouter();
    if (!item || !item.session_date || !item.session_start) {
        //This is required here to avoid empty session_date error
        return (
            <View style={styles.containerNotAvailable}>
            </View>
        );
    }

    const handleCompleteVisitNotes = async () => {
        router.push(`/complete-session-notes/${item.session_number}`);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.buttonStartSession}
                onPress={handleCompleteVisitNotes}
            >
                <Text style={styles.textStartSession}>Complete visit notes</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CompleteVisitNotes;
