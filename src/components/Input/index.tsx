
import {TextInput, View, Text, TextInputProps, StyleSheet, ViewStyle, StyleProp, TextStyle} from 'react-native';
import {forwardRef} from 'react';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { normalize } from '../../utils';

export type InputProps  = TextInputProps & {
    label?: string;
    inputStyle?: object;
    containerStyle?: ViewStyle;
    inputContainerStyle?: ViewStyle;
    required?: boolean;
    labelStyle?: StyleProp<TextStyle>;
    context?: 'currency';
    middleContainerStyle?: ViewStyle;
    focused?: boolean;
  }

  const Input = forwardRef<TextInput, InputProps>((props, ref) => (
      <View style={[{width: '100%'},props.containerStyle]}>
          <Text style={[{
              fontSize: 13,
              lineHeight: 17,
              marginBottom: 5,
              fontFamily: fonts.regular,
          }, props.labelStyle]}>{props.label}</Text>
          <View style={[{borderRadius: 10, overflow: 'hidden'},props.focused ? {borderWidth: 4, borderColor: '#D6E3FD'} : {borderWidth: 4, borderColor: colors.background}]}>
            <View 
                style={[{
                    borderWidth: 2,
                    backgroundColor: 'white', 
                    borderRadius: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderColor: props.focused ? '#2D50E6' : colors.borderGrey,
                    paddingRight: props.context ? normalize(15) : 0
                }, 
                    props.inputContainerStyle
                ]}>
                <TextInput 
                    style={[{
                        height: 48, 
                        fontSize: 17, 
                        lineHeight: 24,
                        paddingHorizontal: normalize(15),
                        fontFamily: fonts.regular, 
                        width: props.context ? '96%' : '100%',
                        color: colors.grey1000},
                        props.inputStyle
                    ]} 
                    value={props.value} 
                    onFocus={props.onFocus} 
                    onEndEditing={props.onEndEditing}
                    placeholder={props.placeholder}
                    placeholderTextColor={colors.mainGrey}
                    multiline={props.multiline}
                    keyboardType={props.keyboardType}
                    onChangeText={props.onChangeText}
                />
                {props.context === 'currency' && <Text style={{
                                                                color: '#6B6651', 
                                                                fontSize: 17, 
                                                                lineHeight: 24, 
                                                                fontFamily: fonts.regular}}>€</Text>}
            </View>
          </View>
      </View>
  ))

  const styles = StyleSheet.create({
      
  })

  export default Input;


