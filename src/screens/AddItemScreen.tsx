import { InputAccessoryView, StyleSheet, View } from "react-native";

import Button from "../components/Button";
import { RootTabScreenProps } from "../navigation/types";
import { colors } from "../theme/colors";
import Input from "../components/Input";
import { normalizeHeight } from "../utils";
import GalleryIcon from "../components/Gallery";
import { ImagePicker } from "../sdk/ImagePicker";
import { useCallback, useState } from "react";



export default function AddItemScreen({
  navigation,
}: RootTabScreenProps<"AddItemScreen">) {
  const [imageData, setImageData] = useState<string | undefined>(undefined);
  const [focusStates, setFocusStates] = useState<{name: boolean; value: boolean; description: boolean;}>({
    name: false,
    value: false,
    description: false,
  });

  const [inputValues, setInputValues] = useState<{name: string; value: string; description: string}>({
    name: '',
    value: '',
    description: '',
  })
  

  const selectImage = useCallback(async () => {
      let imageObject = await ImagePicker.pickImage();
      if (typeof imageObject != 'undefined' && !imageObject.cancelled){
          setImageData(() => imageObject?.base64)
      }   
  }, []);

  const deleteImage = useCallback(() => {
    setImageData(() => undefined)
  }, []);

  const INPUT_FLAGS = {
    NAME: 1,
    VALUE: 2,
    DESCRIPTION: 3,
  }

  const handleFocus = (focus: boolean, flag: number) => {
      switch(flag){
          case INPUT_FLAGS.NAME:
            setFocusStates({...focusStates, name: focus});
            break;
          case INPUT_FLAGS.VALUE:
            setFocusStates({...focusStates, value: focus});
            break;
          case INPUT_FLAGS.DESCRIPTION:
            setFocusStates({...focusStates, description: focus});
            break;
          default:
            return
      }
  }

  const handleInput = (text: string, flag: number) => {
    switch(flag){
      case INPUT_FLAGS.NAME:
        setInputValues({...inputValues, name: text});
        break;
      case INPUT_FLAGS.DESCRIPTION:
        setInputValues({...inputValues, description: text});
        break;
      case INPUT_FLAGS.VALUE:
        setInputValues({...inputValues, value: text});
        break;
      default:
        return null;
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button title="Cancel" onPress={() => navigation.goBack()} />
        <Button title="Add" disabled onPress={() => undefined} />
      </View>
      <View style={{
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingTop: normalizeHeight(26), 
        marginBottom: normalizeHeight(20)
        }}>
      <GalleryIcon onPress={selectImage} imageSource={imageData} onDelete={deleteImage} />
      </View>
      
      <Input 
        focused={focusStates.name} 
        label="Name" 
        containerStyle={{marginBottom: normalizeHeight(20)}}
        onFocus={() => {handleFocus(true, INPUT_FLAGS.NAME)}}
        onEndEditing={() => {handleFocus(false, INPUT_FLAGS.NAME)}}
        onChangeText={(text) => handleInput(text, INPUT_FLAGS.NAME)} 
        placeholder="Bracelet"
        value={inputValues.name} 
        />
      <Input 
        focused={focusStates.value} label="Value" 
        containerStyle={{marginBottom: normalizeHeight(20)}} 
        keyboardType="decimal-pad" 
        placeholder="700" 
        context="currency"
        onFocus={() => {handleFocus(true, INPUT_FLAGS.VALUE)}}
        onEndEditing={() => {handleFocus(false, INPUT_FLAGS.VALUE)}}
        onChangeText={(text) => handleInput(text, INPUT_FLAGS.VALUE)}
        value={inputValues.description}  
        />
      <Input 
        focused={focusStates.description} 
        label="Description" 
        multiline 
        inputStyle={{height: 127}} 
        placeholder="Optional"
        onFocus={() => {handleFocus(true, INPUT_FLAGS.DESCRIPTION)}}
        onEndEditing={() => {handleFocus(false, INPUT_FLAGS.DESCRIPTION)}}
        onChangeText={(text) => handleInput(text, INPUT_FLAGS.DESCRIPTION)}
        value={inputValues.value}  
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
    paddingTop: 10,
  },
  buttonsContainer: {
    width: "100%",
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
});
