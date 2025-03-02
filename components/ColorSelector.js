import { Pressable, View, Modal, Button } from "react-native"
import { useState } from "react"
import { Styles } from "./styles/Styles";
import ColorPicker, { Panel5, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';


export default function ColorSelector({setHabitColor}) {
  const [showModal, setShowModal] = useState(false);

  // Note: 👇 This can be a `worklet` function.
  const onSelectColor = ({ hex }) => {
    // do something with the selected color.
    console.log(hex);
  };

  return (
    <>
    <Pressable onPress={() => setShowModal(true)}>
      <View style={Styles.colorPickerBox}>
      </View>
    </Pressable>

    <ColorPicker value='red' onComplete={onSelectColor}>
        {/* <Preview /> */}
        {/* <Panel5 /> */}
        {/* <HueSlider /> */}
        {/* <OpacitySlider /> */}
        <Swatches />
      </ColorPicker>

    {/* <Button title='Color Picker' onPress={() => setShowModal(true)} /> */}


    {/* <Modal visible={showModal} animationType='slide'>
      <ColorPicker style={{ width: '70%' }} value='red' onComplete={onSelectColor}>
        <Preview />
        <Panel1 />
        <HueSlider />
        <OpacitySlider />
        <Swatches />
      </ColorPicker>

      <Button title='Ok' onPress={() => setShowModal(false)} />
    </Modal> */}
    </>
  )
}