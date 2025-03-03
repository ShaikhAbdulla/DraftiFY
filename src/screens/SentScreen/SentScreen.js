import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import AppHeader from '../../components/reusable/Header';
import ToastMessage, { filterDrafts, scaleHeight, scaleWidth } from '../../Utils';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import DraftCard from '../../components/reusable/DraftCard';
import { loadDrafts } from '../../redux/slices/draftSlice';
import { image } from '../../constants/imageConstants';

const SentScreen = () => {
  const { colors } = useTheme();
  const drafts = useSelector(state => state.drafts);
  const navigation = useNavigation();
  const dispatch = useDispatch()
  console.log('in sent screens',drafts);
  
useEffect(() => {
    dispatch(loadDrafts()); 
  }, [dispatch]);

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Image
        source={image.empty} 
        style={styles.emptyImage} 
      />
      <Text style={styles.emptyText}>No emails sent</Text>
    </View>
  );
  
  return (<>
 
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
    <AppHeader  isDraftScreen={'Home'}/>
    <FlatList
        data={filterDrafts('Sent',drafts)}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <DraftCard onPress={(draft)=> ToastMessage('Email has already been sent!')} draft={item} />}
        ListEmptyComponent={renderEmptyComponent} 
      />
      
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
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

export default SentScreen;
