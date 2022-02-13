import { Dimensions, Platform, PixelRatio, useWindowDimensions } from 'react-native';



const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');


const scale = SCREEN_WIDTH / 375;
const hScale = SCREEN_HEIGHT / 812;

export function normalize(size: number) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

export function normalizeHeight(size: number){
  const newSize = size * hScale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}