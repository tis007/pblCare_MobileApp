import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { icons, COLORS, SIZES } from '../../constants';
import styles from './DatePickerStyle';

const DatePicker = ({ selectedDate, onDateChange }) => {
  const [dates, setDates] = useState([]);
  const scrollViewRef = useRef(null);

  // Simulating date range from 7 days ago to 7 days in the future
  useEffect(() => {
    const currentDate = new Date(selectedDate);
    const dateArray = [];
    for (let i = -7; i <= 7; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      dateArray.push(nextDate.toISOString().split('T')[0]);
    }
    setDates(dateArray);
  }, [selectedDate]);

  useEffect(() => {
    // Scroll to the selected date when the component mounts
    if (scrollViewRef.current) {
      const selectedIndex = dates.indexOf(selectedDate);
      const scrollX =
        (selectedIndex + 14) * (SIZES.medium + SIZES.medium);
      scrollViewRef.current.scrollTo({ x: scrollX, animated: true });
    }
  }, [dates, selectedDate]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {dates.map((date, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onDateChange(date)}
            style={[
              styles.dateItem,
              date === selectedDate && styles.selectedDateItem,
              isToday(date) && styles.todayDateItem,
              isYesterday(date) && styles.yesterdayDateItem,
              isTomorrow(date) && styles.tomorrowDateItem,
            ]}
          >
            <Text
              style={[
                styles.dateText,
                date === selectedDate && styles.selectedDateText,
                isToday(date) && styles.todayDateText,
                isYesterday(date) && styles.yesterdayDateText,
                isTomorrow(date) && styles.tomorrowDateText,
              ]}
            >
              {formatDateForDisplay(date)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// Helper function to format date for display (e.g., "2023-12-17" to "3 Dec, Wed")
const formatDateForDisplay = (dateString) => {
  const options = { day: 'numeric', month: 'short', weekday: 'short' };
  const date = new Date(dateString);

  // Check if the date is today, yesterday, or tomorrow
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }

  return date.toLocaleDateString('en-GB', options);
};

// Helper function to check if a date is today
const isToday = (dateString) => {
  const today = new Date();
  const date = new Date(dateString);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// Helper function to check if a date is yesterday
const isYesterday = (dateString) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const date = new Date(dateString);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
};

// Helper function to check if a date is tomorrow
const isTomorrow = (dateString) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = new Date(dateString);
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
};

export default DatePicker;
