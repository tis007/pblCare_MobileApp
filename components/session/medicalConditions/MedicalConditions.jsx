import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./MedicalConditionsStyle";
import { COLORS } from "../../../constants";
import { MedicalConditionsCard } from "../..";

const MedicalConditions = ({ item }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {item.health_conditions.length === 0 ? (
            <View style={styles.noTasksContainer}>
                <Text style={styles.textNoTasks}>No medical conditions available</Text>
            </View>
        ) : (
          item.health_conditions.map((health_condition, index) => (
            <MedicalConditionsCard
              key={`task-${index}`}
              item={health_condition}
              handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default MedicalConditions;
