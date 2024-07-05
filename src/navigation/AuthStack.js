// Kullanıcı  giriş yapmadan önce göreceği sayfalar (Login, Signup, Forgot Password, Onboarding)
import React from 'react'
import { LoginPage, SignupPage } from '../screens'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    // initial RouteName sayesinde Stack.Screenleri hangi sırayla koyarsan koy başlangıç sayfasını belirlemiş oluyor.
    // eğer initial route name kullanmazsan stack.screen sırasına göre başlangıç sayfasını gösteriyor.
    <Stack.Navigator initialRouteName='Login'>
      
        
        <Stack.Screen name = 'Login' component={LoginPage}/>
        <Stack.Screen name = 'Signup' component={SignupPage}/>
       
      </Stack.Navigator>
  )
}

export default AuthStack