import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TimePicker = ({ initialTime = { hour: 0, minute: 0, second: 0 }, onSave, onCancel }) => {
  // Initialize state with provided initial values or defaults
  const [hour, setHour] = useState(initialTime.hour);
  const [minute, setMinute] = useState(initialTime.minute);
  const [second, setSecond] = useState(initialTime.second);

  // Generate numbers for picker items
  const generateNumbers = (max) => {
    const numbers = [];
    for (let i = 0; i < max; i++) {
      numbers.push(i);
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

  // Format display value with leading zeros
  const formatNumber = (num) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Time</Text>
      
      {/* Single background for all pickers */}
      <View style={styles.singleBackground}>
        <View style={styles.pickerRow}>
          {/* Hour picker */}
          <View style={styles.pickerColumn}>
            <Picker
              style={styles.picker}
              selectedValue={hour}
              onValueChange={(itemValue) => setHour(itemValue)}
            >
              {hours.map((h) => (
                <Picker.Item 
                  key={`hour-${h}`} 
                  label={formatNumber(h)} 
                  value={h} 
                />
              ))}
            </Picker>
            <Text style={styles.label}>hr</Text>
          </View>
          
          {/* Minute picker */}
          <View style={styles.pickerColumn}>
            <Picker
              style={styles.picker}
              selectedValue={minute}
              onValueChange={(itemValue) => setMinute(itemValue)}
            >
              {minutesSeconds.map((m) => (
                <Picker.Item 
                  key={`min-${m}`} 
                  label={formatNumber(m)} 
                  value={m} 
                />
              ))}
            </Picker>
            <Text style={styles.label}>min</Text>
          </View>
          
          {/* Second picker */}
          <View style={styles.pickerColumn}>
            <Picker
              style={styles.picker}
              selectedValue={second}
              onValueChange={(itemValue) => setSecond(itemValue)}
            >
              {minutesSeconds.map((s) => (
                <Picker.Item 
                  key={`sec-${s}`} 
                  label={formatNumber(s)} 
                  value={s} 
                />
              ))}
            </Picker>
            <Text style={styles.label}>sec</Text>
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
          style={[styles.button, styles.saveButton]} 
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
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  singleBackground: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 5,
    marginBottom: 20,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  picker: {
    flex: 1,
    height: 150,
  },
  label: {
    position: 'absolute',
    right: 10,
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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