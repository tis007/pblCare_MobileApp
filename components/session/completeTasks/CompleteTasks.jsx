import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./CompleteTasksStyle";
import { icons, COLORS } from "../../../constants";
import { useRouter } from "expo-router";
import usePost from "../../../hook/usePost";
import SlideButton from 'rn-slide-button';

const CompleteTasks = ({ item }) => {
  const router = useRouter();
  if (!item || !item.session_date || !item.session_start) {
    //This is required here to avoid empty session_date error
    return (
      <View style={styles.containerNotAvailable}>
      </View>
    );
  }


  const canCompleteTasks = item.tasks.every(task => task.task_state === "true" || task.task_state === "unable");


  const handleCompleteTasks = async () => {
    if (canCompleteTasks) {
      const endpoint = "sessions/complete_tasks";
      const postData = {
        session_number: item.session_number,
      };

      try {
        const completeTasksResult = await usePost(endpoint, postData);
        const completeTasksResponse = completeTasksResult.response;
        // Handle different response scenarios
        switch (completeTasksResponse) {
          case 'successful':
            alert('Visit tasks completed successfully');
            router.push(`/home`);
            router.push(`/active-session/${item.session_number}`);
            break;
          case 'error_incomplete_tasks':
            alert('Please complete all your tasks before proceeding to the next step');
            break;
          case 'error_system':
            alert('An error occurred while processing your check in');
            break;
          default:
            alert('An error occurred while processing your check in');
        }
      } catch (error) {
        console.error('Error handling POST request:', error);
        alert('An error occurred while processing your check in');
      }
    } else {
      alert("Cannot complete tasks");
    }
  };

  return (
    <View style={styles.container}>
      {canCompleteTasks ? (
        <View style={{ width: '100%' }}>
        <SlideButton
            title="Mark all tasks completed"
            onReachedToEnd={() => handleCompleteTasks()}
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
            Please complete the remaining {item.tasks.filter(task => task.task_state === "false").length} tasks
          </Text>
        </View>
      )}
    </View>
  );
};

export default CompleteTasks;
