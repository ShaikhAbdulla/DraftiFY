import React, { useEffect } from 'react';
import { Image, View, Text, StatusBar } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { navigateto, text } from '../../constants/TextConstants';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigateToScreen();
    }, 3000);
    return () => clearTimeout(timer);
  }, []); 

  const navigateToScreen = () => {
    navigation.navigate(navigateto.home)
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={text.color_codes.black} />
      <Text style={styles.appName}>{text.app_name}</Text>
      <Text style={styles.appDesc}>{text.app_des}</Text>
    </View>

  );
};

export default SplashScreen