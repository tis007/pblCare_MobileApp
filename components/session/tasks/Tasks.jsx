import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./TasksStyle";
import { COLORS } from "../../../constants";
import { TaskCard } from "../..";

const Tasks = ({ item }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {item.tasks.length === 0 ? (
            <View style={styles.noTasksContainer}>
                <Text style={styles.textNoTasks}>No tasks available</Text>
            </View>
        ) : (
          item.tasks.map((task, index) => (
            <TaskCard
              key={`task-${index}`}
              item={task}
              handleNavigate={() => router.push(`/session-task/${item.session_number}/${task.task_number}`)}
              
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Tasks;
