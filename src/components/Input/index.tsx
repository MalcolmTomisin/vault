
import {TextInput, View, Text, TextInputProps, StyleSheet} from 'react-native';
import {forwardRef} from 'react';

export type InputProps  = TextInputProps & {
    label?: string;
    errorMessage?: string | null;
    inputStyle?: object;
    containerStyle?: object;
    inputContainerStyle?: object;
    required?: boolean;
    labelStyle?: object;
    context?: 'currency';
  }

  const Input = forwardRef<TextInput, InputProps>((props, ref) => (
      <View>
          <Text></Text>
          <View>
              <TextInput />
              {props.context === 'currency' && <Text>€</Text>}
          </View>
      </View>
  ))

  const styles = StyleSheet.create({
      
  })


