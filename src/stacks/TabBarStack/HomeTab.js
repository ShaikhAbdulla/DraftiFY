// HomeScreen.js
import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
     // The new Sent screen
// import { MaterialIcons } from '@expo/vector-icons';
import SentScreen from '../../screens/SentScreen/SentScreen';
import { Text,Image, Alert, BackHandler, SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from '../../screens/DraftScreen/DraftScreens';
import { useRoute } from '@react-navigation/native';
import { image } from '../../constants/imageConstants';
import { scaleHeight, scaleWidth } from '../../Utils';


const Tab = createBottomTabNavigator();

const HomeScreenn = () => {
  const route = useRoute();
  const initialTab = route.params?.screen || 'Drafts';

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Exit App",
        "Do you want to exit?",
        [
          { text: "Cancel", onPress: () => null, style: "cancel" },
          { text: "Yes", onPress: () => BackHandler.exitApp() }
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <StatusBar backgroundColor={'#6200ee'}/>
    <Tab.Navigator
    
    initialRouteName={initialTab}
      screenOptions={({ route }) => ({
        animation:'shift',
        headerShown: false,
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { paddingBottom: 5, height: 60 },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Drafts') {
            iconName = image.tabBarIcon.draft;
          } else if (route.name === 'Sent') {
            iconName = image.tabBarIcon.sent;
          }

          return <Image style={{height:scaleHeight(20),width:scaleWidth(20)}} source={iconName}/>;
        },
      })}
    >
      <Tab.Screen name="Drafts" component={HomeScreen} />
      <Tab.Screen name="Sent" component={SentScreen} />
    </Tab.Navigator>
    </SafeAreaView>
  );
};

export default HomeScreenn;
