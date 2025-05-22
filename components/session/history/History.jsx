import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./HistoryStyle";
import { COLORS } from "../../../constants";
import HistoryCard from "../../common/cards/history/HistoryCard";

const History = ({ item }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {item.care_history.length === 0 ? (
            <View style={styles.noHistoryContainer}>
                <Text style={styles.textNoHistory}>No history available</Text>
            </View>
        ) : (
          item.care_history.map((care_history, index) => (
            <HistoryCard
              key={`history-${index}`}
              item={care_history}
              handleNavigate={() => router.push(`/completed-session/${care_history.care_history_session_number}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default History;
