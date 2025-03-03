import { Dimensions, StyleSheet } from 'react-native'
import { text } from '../../constants/TextConstants';
import { scaleFont } from '../../Utils';



const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    
    backgroundColor: text.color_codes.white2,
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image:{
    height:width *0.7,
    width:width *0.6
  },
  appName:{
    // fontFamily:text.font_bold,
    fontSize: scaleFont(30),
    color:text.color_codes.black,
    fontWeight:'Bold',
    
  },
  appDesc:{
    // alignSelf:'center',
    // fontFamily:text.font_regular,
    fontSize: scaleFont(16),
    color:text.color_codes.light_white,
    fontWeight:'600',
    alignItems:'center',
    textAlign:'center'
  }

})
