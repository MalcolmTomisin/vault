import { InputAccessoryView, StyleSheet, View, KeyboardAvoidingView, ScrollView, Keyboard, TouchableWithoutFeedback } from "react-native";

import Button from "../components/Button";
import { RootTabScreenProps } from "../navigation/types";
import { colors } from "../theme/colors";
import Input from "../components/Input";
import { normalizeHeight } from "../utils";
import GalleryIcon from "../components/Gallery";
import { ImagePicker } from "../sdk/ImagePicker";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addNewValuable} from '../store/features';
import { RootState } from "../store";



export default function AddItemScreen({
  navigation,
}: RootTabScreenProps<"AddItemScreen">) {
  const {valuables} = useSelector((state: RootState) => state);
  const [focusStates, setFocusStates] = useState<{name: boolean; value: boolean; description: boolean;}>({
    name: false,
    value: false,
    description: false,
  });

  const [inputValues, setInputValues] = useState<{name: string; value: string; description: string; image?: string}>({
    name: '',
    value: '',
    description: '',
  });

  const [image, setImage] = useState<string>('');

  const [allStatesValid, setValidStates] = useState<boolean>(false);
  const dispatch = useDispatch();
  

  const selectImage = useCallback(async () => {
      let imageObject = await ImagePicker.pickImage();
      if (typeof imageObject != 'undefined' && !imageObject.cancelled){
          await setImage(() => imageObject?.base64);
          checkInputValues(); 
      }
        
  }, []);

  const deleteImage = () => {
    setImage(() => '');
    setValidStates(() => false);
  }


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
        setInputValues((prevState) => ({...prevState, name: text}));
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

  const checkInputValues = () => {
      for (let values in inputValues){
        if (values === "name"){
          if(inputValues[values].length < 2){
            setValidStates(() => false);
            console.log('here', 1)
            return;
          }
        }
        if (values === "value"){
          if (Number.isNaN(parseInt(inputValues[values], 10))){
            setValidStates(() => false);
            console.log('here', 2, parseInt(inputValues[values], 10))
            return;
          }
        }
      }
      if (image === '' || image == null){
        setValidStates(() => false);
      }
      setValidStates(() => true);
  }

  const addValuesToList = () => {
      dispatch(addNewValuable({
        name: inputValues.name, 
        purchasePrice: parseInt(inputValues.value), 
        photo: `data:image/jpeg;base64,${image}`, 
        description: inputValues.description,
        id: valuables.length + 1,
        type: 'RANDOM STUFF'
      }));
      navigation.goBack();
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView enabled behavior="position" style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button title="Cancel" onPress={() => navigation.goBack()} />
        <Button title="Add" testID="submit-btn" disabled={!allStatesValid} onPress={addValuesToList} />
      </View>
      <View style={{
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingTop: normalizeHeight(26), 
        marginBottom: normalizeHeight(20)
        }}>
      <GalleryIcon testID="imageView" onPress={selectImage} imageSource={image} onDelete={deleteImage} />
      </View>
      
      <Input 
        focused={focusStates.name} 
        label="Name" 
        containerStyle={{marginBottom: normalizeHeight(20)}}
        onFocus={() => {handleFocus(true, INPUT_FLAGS.NAME)}}
        onEndEditing={() => {
          handleFocus(false, INPUT_FLAGS.NAME)
        }}
        onChangeText={(text) => {
          handleInput(text, INPUT_FLAGS.NAME)
          checkInputValues();
        }} 
        placeholder="Bracelet"
        value={inputValues.name}
        testID="nameInput" 
        />
      <Input 
        focused={focusStates.value} label="Value" 
        containerStyle={{marginBottom: normalizeHeight(20)}} 
        keyboardType="decimal-pad" 
        placeholder="700" 
        context="currency"
        onFocus={() => {handleFocus(true, INPUT_FLAGS.VALUE)}}
        onEndEditing={() => {
          handleFocus(false, INPUT_FLAGS.VALUE);
        }}
        onChangeText={(text) => {
          handleInput(text, INPUT_FLAGS.VALUE)
          checkInputValues();
        }}
        value={inputValues.value}
        testID="priceInput"  
        />
      <Input 
        focused={focusStates.description} 
        label="Description" 
        multiline 
        inputStyle={{height: 127}} 
        placeholder="Optional"
        onFocus={() => {handleFocus(true, INPUT_FLAGS.DESCRIPTION)}}
        onEndEditing={() => {
          handleFocus(false, INPUT_FLAGS.DESCRIPTION);
        }}
        onChangeText={(text) => {
          handleInput(text, INPUT_FLAGS.DESCRIPTION)
          checkInputValues();
        }}
        value={inputValues.description}  
        returnKeyType="done"
        />
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
