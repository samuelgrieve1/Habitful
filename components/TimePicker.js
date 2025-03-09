import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TimePicker = ({ initialTime = { hour: 0, minute: 0, second: 0 }, onSave, onCancel, selectedColor }) => {
  // Initialize state with provided initial values or defaults
  const [hour, setHour] = useState(initialTime.hour);
  const [minute, setMinute] = useState(initialTime.minute);
  const [second, setSecond] = useState(initialTime.second);

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
    onSave && onSave({ hour, minute, second });
  };

  // Handle cancel button press
  const handleCancel = () => {
    onCancel && onCancel();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Time</Text>
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
                <Picker.Item key={`hour-${item}`} label={item} value={item} />
              ))}
            </Picker>
            <Text style={styles.unitText}>hr</Text>
          </View>
        </View>

        {/* Minute picker */}
        <View style={styles.pickerWrapper}>
          <View style={styles.pickerWithUnit}>
            <Picker
              style={styles.picker}
              selectedValue={minute.toString().padStart(2, '0')}
              onValueChange={(value) => setMinute(parseInt(value, 10))}
            >
              {minutesSeconds.map((item) => (
                <Picker.Item key={`minute-${item}`} label={item} value={item} />
              ))}
            </Picker>
            <Text style={styles.unitText}>min</Text>
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
                <Picker.Item key={`second-${item}`} label={item} value={item} />
              ))}
            </Picker>
            <Text style={styles.unitText}>sec</Text>
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
  pickerWithUnit: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  picker: {
    width: '80%',
    height: 150,
  },
  unitText: {
    fontSize: 16,
    marginTop: 70,
    marginLeft: -20,
    color: '#666',
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