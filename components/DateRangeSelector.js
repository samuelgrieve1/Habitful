import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// Memoized day component for better performance
const Day = memo(({ 
  date, 
  selectedDate, 
  today, 
  onSelectDate,
  eventDates, // New prop for dates with events
  eventColors, // New prop for custom event indicator colors
}) => {
  const isSelected = 
    date.getDate() === selectedDate.getDate() &&
    date.getMonth() === selectedDate.getMonth() &&
    date.getFullYear() === selectedDate.getFullYear();
  
  const isTodayDate = 
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
  
  // Check if the current date has an event
  const dateString = date.toISOString().split('T')[0];
  const hasEvent = eventDates && eventDates[dateString];
  const eventColor = hasEvent && eventColors && eventColors[dateString] 
    ? eventColors[dateString] 
    : '#FF5722'; // Default orange color for events
  
  // Format functions
  const formatDate = date.getDate().toString();
  const formatMonth = date.toLocaleString('default', { month: 'short' });
  const formatDayName = date.toLocaleString('default', { weekday: 'short' });
  
  return (
    <TouchableOpacity
      style={[
        styles.dayContainer,
        isSelected && styles.selectedDay,
        isTodayDate && styles.todayContainer,
      ]}
      onPress={() => onSelectDate(date)}
      activeOpacity={0.7}
    >
      <Text style={styles.dayName}>{formatDayName}</Text>
      <View style={[styles.dateCircle, isSelected && styles.selectedDateCircle]}>
        <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
          {formatDate}
        </Text>
        
        {/* Event indicator dot */}
        {hasEvent && (
          <View 
            style={[
              styles.eventIndicator, 
              { backgroundColor: eventColor }
            ]} 
          />
        )}
      </View>
      <Text style={styles.monthText}>{formatMonth}</Text>
    </TouchableOpacity>
  );
});

// Memoized week component
const Week = memo(({ days, selectedDate, today, onSelectDate, eventDates, eventColors }) => {
  return (
    <View style={styles.weekContainer}>
      {days.map((day, index) => (
        <View key={index} style={styles.dayWrapper}>
          <Day 
            date={day} 
            selectedDate={selectedDate} 
            today={today} 
            onSelectDate={onSelectDate}
            eventDates={eventDates}
            eventColors={eventColors}
          />
        </View>
      ))}
    </View>
  );
});

const DateRangeSelector = ({ 
  onDateSelect, 
  eventDates = {}, // Format: { '2025-02-26': true, '2025-02-28': true }
  eventColors = {}, // Format: { '2025-02-26': '#FF5722', '2025-02-28': '#4CAF50' }
}) => {
  // Get current date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Reference to the FlatList
  const weekListRef = useRef(null);
  
  // State variables
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(100); // Reduced for better initial load
  
  // Generate weeks more efficiently
  const weeks = useRef([]);
  
  if (weeks.current.length === 0) {
    const totalWeeks = 200; // Reduced for better performance
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - (7 * 100));
    
    for (let i = 0; i < totalWeeks; i++) {
      const weekStartDate = new Date(startDate);
      weekStartDate.setDate(weekStartDate.getDate() + (7 * i));
      
      const days = [];
      for (let j = 0; j < 7; j++) {
        const day = new Date(weekStartDate);
        day.setDate(day.getDate() + j);
        days.push(day);
      }
      
      weeks.current.push({ id: i.toString(), days });
    }
  }
  
  // Handle date selection with useCallback for memoization
  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  }, [onDateSelect]);
  
  // Scroll to initial position (current week)
  useEffect(() => {
    if (weekListRef.current) {
      setTimeout(() => {
        weekListRef.current.scrollToIndex({
          index: currentWeekIndex,
          animated: false,
        });
      }, 100);
    }
  }, []);
  
  // Handle changes to eventDates
  useEffect(() => {
    // Could add logic here if needed when eventDates changes
  }, [eventDates]);
  
  // Memoized renderItem function
  const renderWeek = useCallback(({ item }) => {
    return (
      <Week 
        days={item.days} 
        selectedDate={selectedDate} 
        today={today} 
        onSelectDate={handleDateSelect} 
        eventDates={eventDates}
        eventColors={eventColors}
      />
    );
  }, [selectedDate, today, handleDateSelect, eventDates, eventColors]);
  
  // Handle error when scrolling
  const handleScrollToIndexFailed = useCallback((info) => {
    setTimeout(() => {
      if (weekListRef.current) {
        weekListRef.current.scrollToIndex({ index: info.index, animated: false });
      }
    }, 100);
  }, []);
  
  // Item layout calculation for FlatList optimization
  const getItemLayout = useCallback((data, index) => ({
    length: width,
    offset: width * index,
    index,
  }), []);
  
  // Key extractor for FlatList optimization
  const keyExtractor = useCallback((item) => item.id, []);
  
  return (
    <View style={styles.container}>
      <FlatList
        ref={weekListRef}
        data={weeks.current}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderWeek}
        keyExtractor={keyExtractor}
        onScrollToIndexFailed={handleScrollToIndexFailed}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
        getItemLayout={getItemLayout}
        removeClippedSubviews={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 110,
    width: '100%',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    paddingHorizontal: 10,
  },
  dayWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  dayContainer: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 10,
  },
  selectedDay: {
    backgroundColor: '#f0f0f0',
  },
  todayContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#3498db',
  },
  dayName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dateCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    marginBottom: 4,
    position: 'relative', // For positioning the event indicator
  },
  selectedDateCircle: {
    backgroundColor: '#3498db',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
  },
  selectedDateText: {
    color: 'white',
  },
  monthText: {
    fontSize: 10,
    color: '#666',
  },
  eventIndicator: {
    position: 'absolute',
    bottom: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF5722', // Default color (overridden by eventColors)
  },
});

export default DateRangeSelector;