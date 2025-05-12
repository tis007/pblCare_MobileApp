import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import styles from "./CompletedSessionsStyle";
import { COLORS, SIZES } from "../../../../constants";
import useFetch from "../../../../hook/useFetch";
import CompletedSessionCard from "../../../common/cards/completedSessions/CompletedSessionCard";

const CompletedSessions = ({ selectedDate }) => {
  const router = useRouter();
  const { data = [], isLoading, error, refetch } = useFetch(
    "sessions/get_completed_sessions",
    {
      viewed_date: selectedDate,
    }
  );


  useEffect(() => {
    refetch();
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Completed visits</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : data.length === 0 ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No completed visits</Text>
          </View>
        ) : (
          data.map((item) => (
            <CompletedSessionCard
              key={item.session_number}
              item={item}
              handleNavigate={() => router.push(`/completed-session/${item.session_number}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default CompletedSessions;