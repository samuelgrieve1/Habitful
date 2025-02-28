import { ThemeContext } from './Contexts';
import { LightMode } from './styles/Styles';
import React, { useState, useRef, useEffect, useCallback, memo, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';

const width = Dimensions.get('window').width - 40;

// Memoized day component for better performance
const Day = memo(({ 
  date, 
  selectedDate, 
  today, 
  onSelectDate,
  eventDates, // New prop for dates with events
  eventColors, // New prop for custom event indicator colors
}) => {
  const {theme} = useContext(ThemeContext)
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
    ? '#4185e7'
    // ? eventColors[dateString] 
    : '#4185e7'; // Default orange color for events
  
  // Format functions
  const formatDate = date.getDate().toString();
  const formatDayName = date.toLocaleString('default', { weekday: 'short' });
  
  return (
    <TouchableOpacity
      style={[
        styles.dayContainer,
        isSelected && (theme == LightMode ? styles.selectedDayLm : styles.selectedDayDm),
        isTodayDate && styles.todayContainer,
      ]}
      onPress={() => onSelectDate(date)}
      activeOpacity={0.7}
    >
      <Text style={theme == LightMode ? styles.dayNameLm : styles.dayNameDm}>{formatDayName}</Text>
      <View style={[theme == LightMode ? styles.dateCircleLm : styles.dateCircleDm, isSelected && styles.selectedDateCircle]}>
        <Text style={theme == LightMode ? [styles.dateTextLm, isSelected && styles.selectedDateTextLm] : [styles.dateTextDm, isSelected && styles.selectedDateTextDm]}>
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
  const {theme} = useContext(ThemeContext)
  // Get current date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Reference to the FlatList
  const weekListRef = useRef(null);
  
  // State variables
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(100); // Reduced for better initial load
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.toLocaleString('default', { month: 'long' }));
  const [isCurrentWeekVisible, setIsCurrentWeekVisible] = useState(true);
  
  // Add this new state to track if the month display should be locked to the selected date
  const [lockMonthToSelection, setLockMonthToSelection] = useState(false);
  
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
  
  // Function to check if a week contains today's date
  const weekContainsToday = useCallback((week) => {
    return week.days.some(date => 
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }, [today]);
  
  // Handle date selection with useCallback for memoization
  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
    setCurrentYear(date.getFullYear());
    setCurrentMonth(date.toLocaleString('default', { month: 'long' }));
    setLockMonthToSelection(true);
    
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
  
  // UPDATED: Handle scrolling with respect to manual selections
  const handleScroll = useCallback((event) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const index = Math.floor(xOffset / width);
    
    if (index >= 0 && index < weeks.current.length) {
      const visibleWeek = weeks.current[index];
      const midWeekDay = visibleWeek.days[3]; // Wednesday (0-indexed)
      
      // Only update the month/year display if not locked to a selection
      if (!lockMonthToSelection) {
        setCurrentYear(midWeekDay.getFullYear());
        setCurrentMonth(midWeekDay.toLocaleString('default', { month: 'long' }));
      }
      
      // Check if the selected date is visible in this week
      const isSelectedDateVisible = visibleWeek.days.some(day => 
        day.getDate() === selectedDate.getDate() &&
        day.getMonth() === selectedDate.getMonth() &&
        day.getFullYear() === selectedDate.getFullYear()
      );
      
      // If the selected date is visible, we can unlock the month display
      if (isSelectedDateVisible) {
        setLockMonthToSelection(false);
      }
      
      // Check if the current week (containing today) is visible
      setIsCurrentWeekVisible(weekContainsToday(visibleWeek));
    }
  }, [weekContainsToday, selectedDate, lockMonthToSelection]);
  
  // UPDATED: Handler for "Today" button
  const handleGoToToday = useCallback(() => {
    // Update selected date to today
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    // Set all the state in one go
    setSelectedDate(currentDate);
    setCurrentYear(currentDate.getFullYear());
    setCurrentMonth(currentDate.toLocaleString('default', { month: 'long' }));
    setLockMonthToSelection(false); // No need to lock for today's date
    
    // Scroll to the current week
    if (weekListRef.current) {
      weekListRef.current.scrollToIndex({
        index: 100, // Same as currentWeekIndex initial value
        animated: true,
      });
    }
    
    // Set current week to visible
    setIsCurrentWeekVisible(true);
    
    // Call onDateSelect callback if provided
    if (onDateSelect) {
      onDateSelect(currentDate);
    }
  }, [onDateSelect]);
  
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
    <View style={styles.containerWithHeader}>
      {/* Year and Month header with conditional Today button */}
      <View style={styles.yearHeader}>
        <View style={styles.yearHeaderLeft}>
          {/* Empty view for balance */}
          {isCurrentWeekVisible && <View style={styles.placeholderWidth} />}
        </View>
        
        <Text style={theme == LightMode ? styles.yearTextLm : styles.yearTextDm}>{currentMonth} {currentYear}</Text>
        
        <View style={styles.yearHeaderRight}>
          {/* Today button - only visible when not on the current week */}
          {!isCurrentWeekVisible && (
            <TouchableOpacity 
              style={styles.todayButton}
              onPress={handleGoToToday}
              activeOpacity={0.7}
            >
              <Text style={styles.todayButtonText}>Today</Text>
            </TouchableOpacity>
          )}
          {isCurrentWeekVisible && <View style={styles.placeholderWidth} />}
        </View>
      </View>
      
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
          onScroll={handleScroll}
          scrollEventThrottle={16}
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          windowSize={3}
          getItemLayout={getItemLayout}
          removeClippedSubviews={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWithHeader: {
    width: '100%',
  },
  yearHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#e0e0e0',
    //backgroundColor: '#f8f8f8',
  },
  yearHeaderLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  yearHeaderRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  placeholderWidth: {
    width: 70, // Approximate width of the Today button
  },
  yearTextLm: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  yearTextDm: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  todayButton: {
    //backgroundColor: '#3498db',
    //paddingVertical: 3,
    //paddingHorizontal: 12,
    //borderRadius: 16,
    //elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.5,
  },
  todayButtonText: {
    color: '#4185e7',
    fontSize: 14,
    fontWeight: '600',
  },
  container: {
    height: 90,
    width: '100%',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    paddingHorizontal: 0,
  },
  dayWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  dayContainer: {
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
  },
  selectedDayLm: {
    backgroundColor: '#f5f5f5',
    borderWidth: 0.5,
    borderBottomWidth: 0,
    borderColor: '#ddd',
  },
  selectedDayDm: {
    backgroundColor: '#111',
    borderWidth: 0.5,
    borderBottomWidth: 0,
    borderColor: '#333',
  },
  todayContainer: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#4185e7',
  },
  dayNameLm: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dayNameDm: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  dateCircleLm: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',
    marginBottom: 4,
    position: 'relative', // For positioning the event indicator
  },
  dateCircleDm: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    marginBottom: 4,
    position: 'relative', // For positioning the event indicator
  },
  selectedDateCircle: {
    backgroundColor: '#4185e7',
  },
  dateTextLm: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  dateTextDm: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  selectedDateTextLm: {
    color: '#fff',
  },
  selectedDateTextDm: {
    color: '#fff',
  },
  eventIndicator: {
    position: 'absolute',
    bottom: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4185e7', // Default color (overridden by eventColors)
  },
});

export default DateRangeSelector;