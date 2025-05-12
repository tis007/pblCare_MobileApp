import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./ActiveSessionsStyle";
import { COLORS, SIZES } from "../../../../constants";
import useFetch from "../../../../hook/useFetch";
import ActiveSessionCard from "../../../common/cards/activeSessions/ActiveSessionCard";

const ActiveSessions = ({ selectedDate }) => {
  const router = useRouter();
  const { data = [], isLoading, error, refetch } = useFetch(
    "sessions/get_active_sessions",
    {
      viewed_date: selectedDate,
    }
  );

  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/active-session/${item.session_number}`);
    setSelectedJob(item.session_number);
  };

  useEffect(() => {
    refetch();
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Incomplete visits</Text>
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
            <Text style={styles.noDataText}>No incomplete visits</Text>
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <ActiveSessionCard
                item={item}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.session_number}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default ActiveSessions;