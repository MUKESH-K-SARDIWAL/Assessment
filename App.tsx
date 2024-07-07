/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Dimensions,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Login from './src/Auth/Login';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Registor from './src/Auth/Registor';
import auth from '@react-native-firebase/auth';
import ProductList from './src/Product/ProductList';
import { Provider, useDispatch, useSelector } from 'react-redux';
import LoginScreen from './src/Auth/LoginScreen';
import store from './src/store/store';
import { checkAuthStatus } from './src/store/actions/authActions';
import ProductListScreen from './src/Product/ProductList';
import AddProductScreen from './src/Product/AddProductScreen';
import EditProductScreen from './src/Product/EditProductScreen';
// import { store } from './src/Redux/store';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const { width } = Dimensions.get('screen');

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'pink' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400'
        }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17
        }}
        text2Style={{
          fontSize: 15
        }}
      />
    ),

    dangerToast: ({ text1, props }: any) => (
      <View style={{
        width: width - 62, marginHorizontal: 31, backgroundColor: '#fff', elevation: 8,
        shadowColor: "blue",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.26
      }} className="rounded-lg bg-white p-2.5 border-danger border-2 flex-row items-start ">
        <View className="flex-col flex-1 ml-3">
          <Text className="text-sm text-black" >{props.text}</Text>
        </View>
      </View>
    ),
    successToast: ({ text1, props }: any) => (
      <View style={{
        width: width - 62, marginHorizontal: 31, backgroundColor: '#fff', elevation: 8,
        shadowColor: "blue",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.26
      }} className="rounded-lg bg-white p-2.5 border-[#00D715] border flex-row items-start ">

        <View className="flex-col flex-1 ml-3">
          <Text className="text-sm text-gray5" >{props.text}</Text>
        </View>
      </View>
    )
  };

  return (

    <Provider store={store}>
      <View className='flex-1 bg-white'>
        <StatusBar />

        <AppNavigator />

        <Toast config={toastConfig} />
      </View>

    </Provider>
  );
}


const AppNavigator = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated
          ?
          <>
            <Stack.Screen name="ProductList" component={ProductListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddProduct" component={AddProductScreen} />
            <Stack.Screen name="EditProduct" component={EditProductScreen}  />
          </>
          :
          <Stack.Screen name="Login" component={Login} />
        }
        <Stack.Screen name="Registor" component={Registor} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
