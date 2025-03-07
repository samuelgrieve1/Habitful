import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform
} from 'react-native';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Detect if running on web
const isWeb = Platform.OS === 'web';

// Day cell component
const DayCell = React.memo(({ day, date, isSelected, hasEvent, onPress, eventIndicatorColor }) => {
  if (!day) {
    return <View style={styles.dayCell} />;
  }
  
  return (
    <TouchableOpacity
      style={[
        styles.dayCell,
        isSelected && styles.selectedDay,
      ]}
      onPress={() => onPress(date)}
      activeOpacity={0.7}
    >
      <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
        {day}
      </Text>
      
      {hasEvent && (
        <View 
          style={[
            styles.eventIndicator,
            { backgroundColor: eventIndicatorColor }
          ]} 
        />
      )}
    </TouchableOpacity>
  );
});

// Month component
const CalendarMonth = React.memo(({ monthData, onDayPress, selectedDate, eventDatesMap, eventIndicatorColor }) => {
  const isSelectedDate = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };
  
  // Group days into weeks
  const weeks = [];
  for (let i = 0; i < monthData.days.length; i += 7) {
    weeks.push(monthData.days.slice(i, i + 7));
  }
  
  return (
    <View style={styles.monthContainer}>
      <Text style={styles.monthHeader}>
        {monthData.monthName} {monthData.year}
      </Text>
      
      <View style={styles.weekdayHeader}>
        {DAYS_OF_WEEK.map((day) => (
          <Text key={day} style={styles.weekdayText}>
            {day}
          </Text>
        ))}
      </View>
      
      {weeks.map((week, weekIndex) => (
        <View key={weekIndex} style={styles.weekRow}>
          {week.map((dayData, dayIndex) => (
            <DayCell 
              key={dayIndex}
              day={dayData.day}
              date={dayData.date}
              isSelected={dayData.date && isSelectedDate(dayData.date)}
              hasEvent={dayData.dateString && eventDatesMap[dayData.dateString]}
              onPress={onDayPress}
              eventIndicatorColor={eventIndicatorColor}
            />
          ))}
        </View>
      ))}
    </View>
  );
});

const generateMonthData = (date, monthOffset) => {
  const currentMonth = new Date(date);
  currentMonth.setDate(1);
  currentMonth.setMonth(currentMonth.getMonth() + monthOffset);
  
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  const days = [];
  
  // Add empty spaces for days before the first day of the month
  for (let j = 0; j < firstDayOfMonth; j++) {
    days.push({ day: '', date: null });
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateString = date.toISOString().split('T')[0];
    days.push({
      day,
      date,
      dateString,
    });
  }
  
  // Add empty spaces to complete the last week if needed
  const remainingCells = (7 - (days.length % 7)) % 7;
  for (let j = 0; j < remainingCells; j++) {
    days.push({ day: '', date: null });
  }
  
  return {
    id: `${year}-${month}`,
    year,
    month,
    monthName: MONTHS[month],
    days,
  };
};

const ScrollableCalendar = ({
  eventDates = [],
  onDaySelect,
  initialDate = new Date(),
  monthsToRender = 12,
  selectedDateColor = '#1a73e8',
  eventIndicatorColor = '#f87171',
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const flatListRef = useRef(null);
  
  // Create event dates map
  const eventDatesMap = useMemo(() => {
    return eventDates.reduce((acc, dateStr) => {
      acc[dateStr] = true;
      return acc;
    }, {});
  }, [eventDates]);

  // Generate months data array
  const monthsData = useMemo(() => {
    return Array.from({ length: monthsToRender }, (_, i) => 
      generateMonthData(initialDate, i)
    );
  }, [initialDate, monthsToRender]);

  const handleDayPress = (date) => {
    if (!date) return;
    
    setSelectedDate(date);
    
    if (onDaySelect) {
      onDaySelect(date);
    }
  };
  
  // Render a month
  const renderMonth = ({ item }) => (
    <CalendarMonth
      monthData={item}
      onDayPress={handleDayPress}
      selectedDate={selectedDate}
      eventDatesMap={eventDatesMap}
      eventIndicatorColor={eventIndicatorColor}
    />
  );

  // Use ScrollView on web
  if (isWeb) {
    return (
      <View style={styles.container}>
        {monthsData.map((monthData) => (
          <CalendarMonth
            key={monthData.id}
            monthData={monthData}
            onDayPress={handleDayPress}
            selectedDate={selectedDate}
            eventDatesMap={eventDatesMap}
            eventIndicatorColor={eventIndicatorColor}
          />
        ))}
      </View>
    );
  }

  // Use FlatList on native platforms
  return (
    <FlatList
      ref={flatListRef}
      data={monthsData}
      renderItem={renderMonth}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={true}
      initialNumToRender={3}
      maxToRenderPerBatch={2}
      windowSize={5}
      removeClippedSubviews={Platform.OS !== 'web'}
      contentContainerStyle={styles.listContentContainer}
    />
  );
};

// Get screen width with fallback for web
const windowWidth = Dimensions.get('window').width || 400;
const cellSize = Math.min(windowWidth / 9, 40); // Smaller circles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'auto'
  },
  listContentContainer: {
    paddingBottom: 20
  },
  monthContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  monthHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  weekdayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekdayText: {
    fontSize: 14,
    color: '#666',
    width: cellSize,
    textAlign: 'center',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  dayCell: {
    width: cellSize,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: isWeb ? 4 : cellSize / 2, // Smaller radius on web
  },
  selectedDay: {
    backgroundColor: '#1a73e8',
  },
  dayText: {
    fontSize: 14,
  },
  selectedDayText: {
    color: '#fff',
  },
  eventIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    position: 'absolute',
    bottom: 6,
  },
});

export default ScrollableCalendar;