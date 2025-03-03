// src/components/FloatingButton.js

import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { image } from '../../constants/imageConstants';
import { scaleHeight, scaleWidth } from '../../Utils';
import { text } from '../../constants/TextConstants';

const FloatingButton = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('EmailEditor')}
        activeOpacity={0.7}
      >
      <Image style={{height:scaleHeight(18),width:scaleWidth(18),tintColor:text.color_codes.white2}} source={image.plus}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: 16,

  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default FloatingButton;
