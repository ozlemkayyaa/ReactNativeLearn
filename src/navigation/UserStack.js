// Kullanıcı giriş yaptıktan sonra göreceği sayfalar
import React from 'react'
import { HomePage, Profile } from '../screens'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
        
        <Stack.Screen name = 'Home' component={HomePage}/>
        <Stack.Screen name = 'Profile' component={Profile}/>
       
      </Stack.Navigator>
  )
}

export default UserStack

