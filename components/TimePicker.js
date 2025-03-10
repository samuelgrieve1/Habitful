import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemeContext } from './Contexts';
import { DarkMode } from './styles/Styles';

const TimePicker = ({ setModalVisibleTimePicker, selectedColor, amountOfTime, setAmountOfTime }) => {
  // Initialize state with provided initial values or defaults
  const [hour, setHour] = useState(amountOfTime[0]);
  const [minute, setMinute] = useState(amountOfTime[1]);
  const [second, setSecond] = useState(amountOfTime[2]);
  const { theme } = useContext(ThemeContext)

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

  // Handle save button press
  const handleSave = () => {
    setAmountOfTime && setAmountOfTime([hour, minute, second]);
    setModalVisibleTimePicker && setModalVisibleTimePicker(false);
  };

  // Handle cancel button press
  const handleCancel = () => {
    setModalVisibleTimePicker && setModalVisibleTimePicker(false);
  };

  return (
    <View style={[styles.container, theme == DarkMode && styles.containerDm]}>
      {/* <Text style={[styles.title, theme == DarkMode && styles.titleDm]}>Select Time</Text> */}
      <View style={styles.pickerContainer}>
        {/* Hour picker */}
        <View style={styles.pickerWrapper}>
          <View style={styles.pickerWithUnit}>
            <Picker
              style={styles.picker}
              selectedValue={hour.toString().padStart(2, '0')}
              onValueChange={(value) => setHour(parseInt(value, 10))}
            >
              {hours.map((item) => (
                <Picker.Item key={`hour-${item}`} label={item} value={item} color={theme == DarkMode ? '#fff' : '#000'} />
              ))}
            </Picker>
            <Text style={[styles.unitText, theme == DarkMode && styles.unitTextDm]}>hr</Text>
          </View>
        </View>

        {/* Minute picker */}
        <View style={styles.pickerWrapper}>
          <View style={styles.pickerWithUnit}>
            <Picker
              style={styles.picker}
              selectedValue={minute.toString().padStart(2, '0')}
              onValueChange={(value) => setMinute(parseInt(value, 10))}
              itemStyle={{backgroundColor: 'transparent'}}
            >
              {minutesSeconds.map((item) => (
                <Picker.Item key={`minute-${item}`} label={item} value={item} color={theme == DarkMode ? '#fff' : '#000'} />
              ))}
            </Picker>
            <Text style={[styles.unitText, theme == DarkMode && styles.unitTextDm]}>min</Text>
          </View>
        </View>

        {/* Second picker */}
        <View style={styles.pickerWrapper}>
          <View style={styles.pickerWithUnit}>
            <Picker
              style={styles.picker}
              selectedValue={second.toString().padStart(2, '0')}
              onValueChange={(value) => setSecond(parseInt(value, 10))}
            >
              {minutesSeconds.map((item) => (
                <Picker.Item key={`second-${item}`} label={item} value={item} color={theme == DarkMode ? '#fff' : '#000'} />
              ))}
            </Picker>
            <Text style={[styles.unitText, theme == DarkMode && styles.unitTextDm]}>sec</Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]} 
          onPress={handleCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.saveButton, {backgroundColor: selectedColor}]} 
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  containerDm: {
    backgroundColor: '#000',
    borderColor: '#222'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
  },
  titleDm: {
    color: '#fff',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  pickerWithUnit: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  picker: {
    marginTop: -20,
    width: '100%',
    height: 200,
  },
  pickerItem: {
    color: '#fff',
  },
  unitText: {
    fontSize: 18,
    marginTop: -2,
    marginLeft: -42,
    color: '#000',
  },
  unitTextDm: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#333',
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
});

export default TimePicker;