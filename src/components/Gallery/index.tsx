import { FontAwesome, Ionicons } from '@expo/vector-icons';
import {Text, View, Pressable, PressableProps, Image} from 'react-native';
import { colors } from '../../theme/colors';
import { normalize, normalizeHeight } from '../../utils';
import { fonts } from '../../theme/fonts';

type GalleryIconProps = PressableProps & {
    imageSource?: string;
    onDelete?: () => void;
}

export default function GalleryIcon(props: GalleryIconProps){
    return(
        <Pressable 
            onPress={props.onPress}>
            <View 
            style={[{
                        width: normalize(150), 
                        height: normalize(150), 
                        borderStyle: 'dashed', 
                        borderRadius: 0.9 * normalize(150),
                        borderWidth: 2,
                        borderColor: '#EAE9E3',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        }, props.imageSource ? null : {paddingTop: normalize(43),
                            paddingBottom: normalize(37)}]}>
            
            {props.imageSource ? <View style={{overflow: 'hidden', borderRadius: 0.9 * normalize(150),}}><Image source={{uri: 'data:image/jpeg;base64,' +  props.imageSource}} style={{width: normalize(150), 
                        height: normalizeHeight(150),}} resizeMode="cover" /></View> : <>
                <FontAwesome name="camera" size={normalize(32)} color={colors.mainBlue} />
                <Text style={{fontSize: normalize(17), lineHeight: normalize(24), fontFamily: fonts.regular, textAlign: 'center'}}>Add photo</Text>
            </>}
            <Pressable 
            onPress={props.onDelete}
            style={{
                backgroundColor: '#D95762', 
                position: 'absolute', 
                height: normalize(32), 
                width: normalize(32),
                borderRadius: 0.9 * normalize(32),
                justifyContent: 'center',
                alignItems: 'center',
                bottom: 0,
                right: 0,
                zIndex: 5,
                }}>
                <Ionicons name="ios-trash" size={normalize(15)} color="white" />
            </Pressable>
        </View>
        </Pressable>
    )
}