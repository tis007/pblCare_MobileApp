import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "./CompleteVisitNotesContentStyle";
import { icons, images, COLORS } from "../../../constants";
import usePost from "../../../hook/usePost";
import Encryption from "../../../modules/Encryption";
import { useRouter } from "expo-router";
import SlideButton from 'rn-slide-button';

const CompleteVisitNotesContent = ({ item }) => {
    const router = useRouter();
    const [notes, setNotes] = useState(""); // State variable to store notes

    const handleComplete = async () => {
        const sessionNotes = Encryption.encrypt(notes);

        const endpoint = "sessions/complete_notes";
        const postData = {
            session_number: item.session_number,
            session_notes: sessionNotes
        };

        try {
            const completeNotesResult = await usePost(endpoint, postData);
            const completeNotesResponse = completeNotesResult.response;

            // Handle different response scenarios
            switch (completeNotesResponse) {
                case 'successful':
                    alert('Visit notes completed successfully');
                    router.push(`/home`);
                    router.push(`/active-session/${item.session_number}`);
                    break;
                case 'error_empty_notes':
                    alert('Please enter your notes for the visit');
                    break;
                case 'error_short_notes':
                    alert('Your visit notes are too short, please enter at least 50 characters');
                    break;
                case 'error_system':
                    alert('An error occurred while processing your notes submission');
                    break;
                default:
                    alert('An error occurred while processing your notes submission');
            }
        } catch (error) {
            console.error('Error handling POST request:', error);
            alert('An error occurred while processing your notes submission');
        }
    };

    const handleNotesChange = (text) => {
        // Check if the new value differs in length by 1 character
        if (Math.abs(text.length - notes.length) < 10) {
            setNotes(text);
        }else{
            alert('Pasting visit notes is not allowed');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textInstructions}>
                Please provide detailed visit notes in the space below. Kindly describe your observations and experiences during the visit.
                Feel free to elaborate on what transpired, how the visit unfolded, and any notable occurrences encountered. Your thorough input is greatly appreciated.
            </Text>
            <TextInput
                style={styles.textArea}
                placeholder="Enter notes here... (Min 50 characters)"
                multiline
                value={notes}
                onChangeText={handleNotesChange}
            />
            <View style={{ width: '100%' }}>
        <SlideButton
            title="Complete visit notes"
            onReachedToEnd={() => handleComplete()}
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
        </View>
    );
};

export default CompleteVisitNotesContent;
