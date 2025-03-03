import React, { useEffect } from 'react';
import { View, FlatList, Button, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import DraftCard from '../../components/reusable/DraftCard';
import FloatingButton from '../../components/reusable/FloatingButton';
import { dropDraftsTable, fetchDrafts } from '../../database/db';
import { loadDrafts } from '../../redux/slices/draftSlice';
import AppHeader from '../../components/reusable/Header';
import { image } from '../../constants/imageConstants';
import { Text, useTheme } from 'react-native-paper';
import { filterDrafts, scaleHeight, scaleWidth } from '../../Utils';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const HomeScreen = () => {
  const { colors, dark } = useTheme();
  const drafts = useSelector(state => state.drafts);
  const navigation = useNavigation();
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(loadDrafts()); 
  }, [dispatch]);
//   useEffect(()=>{
// // fetchDrafts()
// dropDraftsTable()
//   },[])

const renderEmptyComponent = () => (
  <View style={styles.emptyContainer}>
    <Image
      source={image.empty} 
      style={styles.emptyImage} 
    />
    <Text style={styles.emptyText}>No drafts yet</Text>
  </View>
);

  return (
    <View style={{flex:1,backgroundColor:colors.surface}}>
        <AppHeader isDraftScreen={'Home'}/>
    <FlatList
        data={filterDrafts('Draft',drafts)}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <DraftCard onPress={(draft)=> navigation.navigate('EmailEditor', { draft: draft })} draft={item} />}
        ListEmptyComponent={renderEmptyComponent} 
      />

<FloatingButton />
    </View>
  );
};


const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 250,
    
  },
  emptyImage: {
    width: scaleWidth(100),
    height: scaleHeight(100),
    marginBottom: 20,
    resizeMode: 'contain',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
});

export default HomeScreen;
