import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Styles, LightMode, DarkMode } from './styles/Styles';

const TimePicker = ({ onTimeSelected, selectedColor, setModalVisibleTimePicker }) => {
  // Initialize state with default values
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  // Generate numbers for picker items
  const generateNumbers = (max) => {
    const numbers = [];
    for (let i = 0; i < max; i++) {
      numbers.push(i.toString().padStart(2, '0'));
    }
    return numbers;
  };

  // Arrays for picker items
  const hours = generateNumbers(24);
  const minutesSeconds = generateNumbers(60);

  // Update the parent component whenever time changes
  React.useEffect(() => {
    onTimeSelected && onTimeSelected([hour, minute, second]);
  }, [hour, minute, second, onTimeSelected]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Select Time</Text> */}
      <View style={styles.pickerContainer}>
        {/* Hour picker */}
        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>Hour</Text>
          <Picker
            style={styles.picker}
            selectedValue={hour.toString().padStart(2, '0')}
            onValueChange={(value) => setHour(parseInt(value, 10))}
          >
            {hours.map((item) => (
              <Picker.Item key={`hour-${item}`} label={item} value={item} />
            ))}
          </Picker>
        </View>

        {/* Minute picker */}
        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>Minute</Text>
          <Picker
            style={styles.picker}
            selectedValue={minute.toString().padStart(2, '0')}
            onValueChange={(value) => setMinute(parseInt(value, 10))}
          >
            {minutesSeconds.map((item) => (
              <Picker.Item key={`minute-${item}`} label={item} value={item} />
            ))}
          </Picker>
        </View>

        {/* Second picker */}
        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>Second</Text>
          <Picker
            style={styles.picker}
            selectedValue={second.toString().padStart(2, '0')}
            onValueChange={(value) => setSecond(parseInt(value, 10))}
          >
            {minutesSeconds.map((item) => (
              <Picker.Item key={`second-${item}`} label={item} value={item} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Display selected time */}
      {/* <View style={styles.selectedTimeContainer}>
        <Text style={styles.selectedTime}>
          {hour.toString().padStart(2, '0')}:
          {minute.toString().padStart(2, '0')}:
          {second.toString().padStart(2, '0')}
        </Text>
      </View> */}
      <View style={styles.btns}>
        <Pressable  style={[Styles.btnSave, {backgroundColor: selectedColor}]} onPress={() => {setModalVisibleTimePicker(false)}}>
          <Text style={Styles.txtSave}>Done</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  picker: {
    width: '100%',
    height: 150,
  },
  selectedTimeContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectedTime: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  btns: {
    marginTop: 60,
  },
});

export default TimePicker;