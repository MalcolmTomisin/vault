import { Dimensions, Platform, PixelRatio, useWindowDimensions } from 'react-native';



const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();


const scale = SCREEN_WIDTH / 375;

export function normalize(size: number) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}