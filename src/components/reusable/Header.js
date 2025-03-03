// src/components/AppHeader.js

import React from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { image } from '../../constants/imageConstants';
import { scaleHeight, scaleWidth } from '../../Utils';
import { text } from '../../constants/TextConstants';
import { useTheme } from 'react-native-paper';

const AppHeader = ({onClickSend,isDraftScreen,onBack}) => {

  return (
    <View style={styles.container}>
      {isDraftScreen ? (
        <TouchableOpacity onPress={() => console.log('Menu opened')}>
          <Image style={styles.icon} source={image.headerIcons.menu}/>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => onBack()}>
        <Image source={image.backIcon} style={styles.icon} />
        </TouchableOpacity>
      )}

      {isDraftScreen ? (
        <TextInput
          style={styles.searchBar}
          placeholder="Search drafts"
          placeholderTextColor="#ccc"
        />
      ) : (
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => console.log('Compose')}>
            <Image source={image.headerIcons.attachFile} style={[styles.icon,{marginHorizontal:scaleWidth(20)}]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onClickSend()}>
          <Image source={image.headerIcons.send} style={[styles.icon,{marginHorizontal:scaleWidth(10)}]} />
          </TouchableOpacity>
        </View>
      )}
      {isDraftScreen && (
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.profileImage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scaleHeight(14),
    justifyContent:'space-between',
    height:scaleHeight(60),
    backgroundColor: '#F2F2F2' ,
  },
  searchBar: {
    flex: 1,
    height: scaleHeight(37),
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    color: '#000',
    lineHeight:scaleHeight(5)
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent:'space-around'
  },
  icon: {
    height:scaleHeight(20),width:scaleWidth(20)
  },
});

export default AppHeader;
