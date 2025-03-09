import React, { useState, useRef, useMemo, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform
} from 'react-native';
import { ThemeContext, CustomColorContext } from '../../components/Contexts';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Pure component for day cell to minimize render operations
const DayCell = React.memo(({ day, date, isSelected, hasEvent, onPress, eventIndicatorColor }) => {
  const {theme} = useContext(ThemeContext)
  const {customColor} = useContext(CustomColorContext)

  if (!day) {
    return <View style={styles.dayCell} />;
  }
  
  return (
    <TouchableOpacity
      style={[
        styles.dayCell,
        isSelected && styles.selectedDay && {backgroundColor: customColor}
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

// Pure component for week row to minimize render operations
const WeekRow = React.memo(({ days, selectedDate, eventDatesMap, onDayPress, eventIndicatorColor }) => {
  const isSelectedDate = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };
  
  return (
    <View style={styles.weekRow}>
      {days.map((dayData, index) => (
        <DayCell
          key={index}
          day={dayData.day}
          date={dayData.date}
          isSelected={dayData.date && isSelectedDate(dayData.date)}
          hasEvent={dayData.dateString && eventDatesMap[dayData.dateString]}
          onPress={onDayPress}
          eventIndicatorColor={eventIndicatorColor}
        />
      ))}
    </View>
  );
});

// Pure component for calendar month to minimize render operations
const CalendarMonth = React.memo(({ monthData, onDayPress, selectedDate, eventDatesMap, eventIndicatorColor }) => {
  // Group days into weeks for better rendering
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
      
      {weeks.map((week, index) => (
        <WeekRow
          key={index}
          days={week}
          selectedDate={selectedDate}
          eventDatesMap={eventDatesMap}
          onDayPress={onDayPress}
          eventIndicatorColor={eventIndicatorColor}
        />
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
  
  // Create event dates map once and memoize it
  const eventDatesMap = useMemo(() => {
    return eventDates.reduce((acc, dateStr) => {
      acc[dateStr] = true;
      return acc;
    }, {});
  }, [eventDates]);

  // Generate months data array and memoize it
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
  
  // Memoize the render function to prevent recreating it on each render
  const renderMonth = useMemo(() => {
    return ({ item }) => (
      <CalendarMonth
        monthData={item}
        onDayPress={handleDayPress}
        selectedDate={selectedDate}
        eventDatesMap={eventDatesMap}
        eventIndicatorColor={eventIndicatorColor}
      />
    );
  }, [selectedDate, eventDatesMap, eventIndicatorColor]);

  // Calculate heights based on number of weeks in the month
  const getItemLayout = (data, index) => {
    const monthData = data[index];
    const weeksCount = Math.ceil(monthData.days.length / 7);
    const headerHeight = 60; // Month name + weekday headers
    const weekHeight = 50; // Height per week row
    const monthHeight = headerHeight + (weeksCount * weekHeight);
    
    let offset = 0;
    for (let i = 0; i < index; i++) {
      const prevMonthData = data[i];
      const prevWeeksCount = Math.ceil(prevMonthData.days.length / 7);
      offset += headerHeight + (prevWeeksCount * weekHeight);
    }
    
    return {
      length: monthHeight,
      offset,
      index,
    };
  };
  
  return (
    <FlatList
      ref={flatListRef}
      data={monthsData}
      renderItem={renderMonth}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={true}
      initialNumToRender={2}
      maxToRenderPerBatch={1}
      updateCellsBatchingPeriod={50}
      windowSize={3}
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}
      maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
      onEndReachedThreshold={0.5}
      decelerationRate={Platform.OS === 'ios' ? 'normal' : 0.85}
      snapToAlignment="start"
    />
  );
};

const { width } = Dimensions.get('window');
const cellSize = width / 7 - 6;

const styles = StyleSheet.create({
  monthContainer: {
    flex: 1,
    marginBottom: 16,
    paddingHorizontal: 6,
  },
  monthHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    height: 25,
  },
  weekdayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    height: 20,
  },
  weekdayText: {
    fontSize: 14,
    color: '#666',
    width: cellSize,
    textAlign: 'center',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
  },
  dayCell: {
    color: '#fff',
    width: cellSize,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: cellSize / 2,
  },
  selectedDay: {
    backgroundColor: '#4185e7',
  },
  dayText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedDayText: {
    color: '#fff',
  },
  eventIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    bottom: 8,
  },
});

export default ScrollableCalendar;