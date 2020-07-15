import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/pages/Login';
import Home from './src/pages/Home';
import Signup from './src/pages/Signup';
import Question from './src/pages/Question';
import { persistor, store } from './src/store/index.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';


const Stack = createStackNavigator();

function App() {

  useEffect(() => {
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        console.log('admob setado com sucesso');
      });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Signup' component={Signup} />
            <Stack.Screen name='Question' component={Question} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
