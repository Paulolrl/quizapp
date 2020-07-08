import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/pages/Login';
import Home from './src/pages/Home';
import Signup from './src/pages/Signup';
import { persistor, store } from './src/store/index.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';


const Stack = createStackNavigator();

function App() {
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
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
