  import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
  import { Styles, LightMode, DarkMode } from './styles/Styles';

  export default function DropdownMenu ({theme, selectedColor, defaultValue, data, setSelectedMenuItem, menuIcon}) {
    const [value, setValue] = useState(defaultValue);
    const [isFocus, setIsFocus] = useState(false);

    // const renderLabel = () => {
    //   if (value || isFocus) {
    //     return (
    //       <Text style={[styles.label, isFocus && { color: 'blue' }]}>
    //         Dropdown label
    //       </Text>
    //     );
    //   }
    //   return null;
    // };

    return (
      <View style={theme == LightMode ? styles.containerLm : styles.containerDm}>
        {/* {renderLabel()} */}
        <Dropdown
          style={[theme == LightMode ? styles.dropdownLm : styles.dropdownDm, isFocus && { borderColor: 'blue' }]}
          containerStyle={theme == LightMode ? styles.containerStyleLm : styles.containerStyleDm}
          itemContainerStyle={theme == LightMode ? styles.itemContainerStyleLm : styles.itemContainerStyleDm}
          itemTextStyle={theme == LightMode ? styles.itemTextStyleLm : styles.itemTextStyleDm}
          activeColor={theme == LightMode ? '#eee' : '#111'}
          placeholderStyle={theme == LightMode ? styles.placeholderStyleLm : styles.placeholderStyleDm}
          selectedTextStyle={theme == LightMode ? styles.selectedTextStyleLm : styles.selectedTextStyleDm}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          iconColor={theme == DarkMode ? '#fff' : '#000'}
          data={data}
          //search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? value : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setSelectedMenuItem(item.value)
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            menuIcon && menuIcon
          )}
        />
      </View>
    );
  };

  
  const styles = StyleSheet.create({
    // LIGHTMODE
    containerLm: {
      flex: 1,
      backgroundColor: 'white',
      marginBottom: 10,
    },
    containerStyleLm: {
      backgroundColor: 'white',
      borderColor: '#ddd',
      borderRadius: 5,
    },
    itemContainerStyleLm: {
      backgroundColor: 'white',
      color: 'black',
      borderRadius: 5,
    },
    itemTextStyleLm: {
      color: 'black',
    },
    dropdownLm: {
      width: '100%',
      marginLeft: '0%',
      height: 50,
      backgroundColor: '#eee',
      // borderColor: '#ddd',
      // borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    labelLm: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    selectedTextStyleLm: {
      textAlign: 'left',
      fontSize: 16,
      color: 'black',
      fontWeight: '600'
    },
    placeholderStyleLm: {
      fontSize: 16,
      color: 'black',
      fontWeight: '600'
    },

    // DARKMODE
    containerDm: {
      flex: 1,
      backgroundColor: 'black',
      marginBottom: 10,
    },
    containerStyleDm: {
      backgroundColor: 'black',
      borderColor: '#222',
      borderRadius: 5,
    },
    itemContainerStyleDm: {
      backgroundColor: 'black',
      color: 'white',
      borderRadius: 5,
    },
    itemTextStyleDm: {
      color: 'white',
    },
    dropdownDm: {
      width: '100%',
      marginLeft: '0%',
      height: 50,
      backgroundColor: '#111',
      //borderColor: '#333',
      //borderWidth: 0.5,
      borderRadius: 5,
      paddingHorizontal: 15,
    },
    labelDm: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    selectedTextStyleDm: {
      textAlign: 'left',
      fontSize: 16,
      color: 'white',
    },
    placeholderStyleDm: {
      fontSize: 16,
      color: 'white',
    },

    // BOTH
    icon: {
      marginRight: 5,
    },
    iconStyle: {
      width: 30,
      height: 30,
    },
    inputSearchStyle: {
      height: 50,
      fontSize: 16,
    },
  });