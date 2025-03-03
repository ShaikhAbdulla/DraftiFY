import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import EmailEditorScreen from './src/screens/DetailsScreen/Detail';
import { createTable } from './src/database/db';
import SplashScreen from './src/screens/SplashScreen/Splash';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import HomeScreenn from './src/stacks/TabBarStack/HomeTab';

const Stack = createNativeStackNavigator();

const App = () => {

useEffect(()=>{

createTable()
},[])

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
  },
};

  return (
    <Provider store={store}>
  <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreenn} options={{ headerShown: false }} />
            <Stack.Screen name="EmailEditor" component={EmailEditorScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        </PaperProvider>
    </Provider>

  );
};

export default App;
