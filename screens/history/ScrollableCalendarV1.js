import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const ScrollableCalendar = ({
  eventDates = [], // Array of date strings (YYYY-MM-DD format)
  onDaySelect, // Function to run when a day is selected
  initialDate = new Date(), // Default to current date
  monthsToRender = 12, // Number of months to render
  selectedDateColor = '#1a73e8',
  eventIndicatorColor = '#f87171',
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [months, setMonths] = useState([]);
  const scrollViewRef = useRef(null);
  
  // Process event dates into a map for easy lookup
  const eventDatesMap = eventDates.reduce((acc, dateStr) => {
    acc[dateStr] = true;
    return acc;
  }, {});

  // Generate calendar data
  useEffect(() => {
    const generateMonths = () => {
      const result = [];
      const startDate = new Date(initialDate);
      startDate.setDate(1);
      
      for (let i = 0; i < monthsToRender; i++) {
        const currentMonth = new Date(startDate);
        currentMonth.setMonth(currentMonth.getMonth() + i);
        
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
            hasEvent: eventDatesMap[dateString] || false,
          });
        }
        
        result.push({
          year,
          month,
          monthName: MONTHS[month],
          days,
        });
      }
      
      return result;
    };
    
    setMonths(generateMonths());
  }, [initialDate, eventDates, monthsToRender]);

  // Scroll to current month on initial render
  useEffect(() => {
    if (scrollViewRef.current) {
      // We need to wait for layout to be complete
      setTimeout(() => {
        const currentMonthIndex = 0; // First month in our array is the current month
        const monthHeight = 320; // Approximate height of a month
        scrollViewRef.current.scrollTo({
          y: currentMonthIndex * monthHeight,
          animated: true,
        });
      }, 100);
    }
  }, [months]);

  const handleDayPress = (date) => {
    if (!date) return;
    
    setSelectedDate(date);
    
    if (onDaySelect) {
      onDaySelect(date);
    }
  };
  
  const isSelectedDate = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };
  
  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {months.map((monthData, monthIndex) => (
        <View key={`${monthData.year}-${monthData.month}`} style={styles.monthContainer}>
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
          
          <View style={styles.daysGrid}>
            {monthData.days.map((dayData, dayIndex) => (
              <TouchableOpacity
                key={dayIndex}
                style={[
                  styles.dayCell,
                  dayData.date && isSelectedDate(dayData.date) && styles.selectedDay,
                ]}
                onPress={() => dayData.date && handleDayPress(dayData.date)}
                disabled={!dayData.day}
              >
                <Text
                  style={[
                    styles.dayText,
                    dayData.date && isSelectedDate(dayData.date) && styles.selectedDayText,
                  ]}
                >
                  {dayData.day}
                </Text>
                
                {dayData.hasEvent && (
                  <View 
                    style={[
                      styles.eventIndicator,
                      { backgroundColor: eventIndicatorColor }
                    ]} 
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');
const cellSize = width / 7 - 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayCell: {
    width: cellSize,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: cellSize / 2,
  },
  selectedDay: {
    backgroundColor: '#1a73e8',
  },
  dayText: {
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
    bottom: 10,
  },
});

export default ScrollableCalendar;