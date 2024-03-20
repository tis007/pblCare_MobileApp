import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "./CompleteTaskContentStyle";
import { COLORS, icons } from "../../../constants";
import usePost from "../../../hook/usePost";
import Encryption from "../../../modules/Encryption";
import { useRouter } from "expo-router";
import SlideButton from 'rn-slide-button';

const CompleteTaskContent = ({ item }) => {
    const router = useRouter();
    const [notes, setNotes] = useState("");

    //Decrypt data
    const taskDescription = Encryption.decrypt(item.task_description);
    const taskInstructions = Encryption.decrypt(item.task_instructions);
    const taskNotes = Encryption.decrypt(item.task_notes);

    const getStyleForTaskState = (taskState) => {
        switch (taskState) {
            case "true":
                return styles.textStateCompleted;
            case "false":
                return styles.textStateIncomplete;
            case "unable":
                return styles.textStateUnable;
            default:
                return styles.textStateDefault;
        }
    };

    const getTextForTaskState = (taskState) => {
        switch (taskState) {
            case "true":
                return "Completed";
            case "false":
                return "Incomplete";
            case "unable":
                return "Unable to complete";
            default:
                return "Unknown";
        }
    };

    const handleComplete = async ({ taskState }) => {
        const taskNotes = Encryption.encrypt(notes);

        const endpoint = "sessions/complete_task";
        const postData = {
            session_number: item.session_number,
            task_number: item.task_number,
            task_notes: taskNotes,
            task_state: taskState,
        };

        try {
            const completeTaskResult = await usePost(endpoint, postData);
            const completeTaskResponse = completeTaskResult.response;

            // Handle different response scenarios
            switch (completeTaskResponse) {
                case 'successful':
                    alert('Task completed successfully');
                    router.push(`/home`);
                    router.push(`/active-session/${item.session_number}`);
                    break;
                case 'successful_unable':
                    alert('Task marked unable to complete');
                    router.push(`/home`);
                    router.push(`/active-session/${item.session_number}`);
                    break;
                case 'error_empty_notes':
                    alert('Please enter your notes for the task, please explain why you cannot complete the task');
                    break;
                case 'error_short_notes':
                    alert('Your task notes are too short, please enter at least 50 characters');
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
        } else {
            alert('Pasting task notes is not allowed');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textKey}>
                State:
            </Text>
            <Text style={getStyleForTaskState(item.task_state)}>
                {getTextForTaskState(item.task_state)}
            </Text>
            <Text style={styles.textKey}>
                Description:
            </Text>
            <Text style={styles.textDescription}>
                {taskDescription}
            </Text>
            <Text style={styles.textKey}>
                Instructions:
            </Text>
            <Text style={styles.textInstructions}>
                {taskInstructions}
            </Text>
            {taskNotes !== "" && (
                <View>
                    <Text style={styles.textKey}>
                        Notes:
                    </Text>
                    <Text style={styles.textInstructions}>
                       {taskNotes}
                    </Text>
                </View>

            )}
            {item.task_state === "false" && (
                <View>
                    <Text style={styles.textKey}>
                        Notes:
                    </Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Enter notes here..."
                        multiline
                        value={notes}
                        onChangeText={handleNotesChange}
                    />


                    <View style={{ width: '100%' }}>
                        <SlideButton
                            title="Slide To Complete task"
                            onReachedToEnd={() => handleComplete({ taskState: "true" })}
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

                    <View style={{ width: '100%' }}>
                        <SlideButton
                            title="Cannot complete task"
                            onReachedToEnd={() => handleComplete({ taskState: "unable" })}
                            autoReset="true"
                            completeThreshold="90"
                            icon={<Image source={require('../../../assets/icons/chevron-right-white.png')} style={{ width: 20, height: 20 }} />}
                            titleStyle={{
                                color: COLORS.red,
                            }}
                            containerStyle={{
                                width: '100%',
                                borderRadius: 0,
                                backgroundColor: COLORS.gray3,
                            }}
                            thumbStyle={{
                                borderRadius: 20,
                                backgroundColor: COLORS.red,
                            }}
                            underlayStyle={{
                                borderRadius: 20,
                                backgroundColor: COLORS.red
                            }}
                        />
                    </View>

                </View>
            )}



        </View>
    );
};

export default CompleteTaskContent;
