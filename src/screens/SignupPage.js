import { Pressable, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import {Loading,CustomTextInput, CustomButton} from '../components/'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../redux/userSlice'


const SignupPage = ({navigation}) => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isloading, setIsLoading] = useState(false)

  const dispatch = useDispatch();

  const {isLoading} = useSelector(state=>state.user)

  const handleRegister = ()=> {
    dispatch(signIn({email, password}))
  }

  if (isLoading){
    return <Loading/>
  }

  return (
    <SafeAreaView style={styles.container}>

        { /* Burası 1'lik alan kaplar, header bölümü */ }
        <View style = {styles.title}>
          <Text style = {styles.textStyle}>Sign Up</Text>
        </View>

        { /* Burası 2'lik alan kaplar, text field bölümü */ }
        <View style = {styles.textInputContainer}>
          <CustomTextInput 
            title= 'Name'
            isSecureText={false}
            onChangeText={setName}
            value={name}
            placeholder='Enter your Name'
          />
          <CustomTextInput 
            title= 'Email'
            isSecureText={false}
            onChangeText={setEmail}
            value={email}
            placeholder='Enter your Email'
          />
          <CustomTextInput 
            title= 'Password'
            isSecureText={true}
            onChangeText={setPassword}
            value={password}
            placeholder='Enter your Password'
          />
        </View> 

        { /* Burası 3'lük alan kaplar, butonlar bölümü*/ }
        <View style={styles.buttonOptions}>
          <CustomButton  
            buttonText= "Sign Up"
            setWidth = "%100"
            buttonColor = "pink"
            pressedButtonColor="gray"
            handleOnPress={handleRegister}
          />

        <Pressable 
          onPress={() => navigation.navigate('Login')} >
          <Text style = {styles.textStyle}>Already have an account? Login</Text>
        </Pressable>
        </View>

    </SafeAreaView>
  )
}

export default SignupPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: 'pink',
    borderWidth: 1.5,
    width: "100%",
    height: 50,
    borderRadius:15,
    alignItems:'center',
    justifyContent:'center',
    marginTop:30,
    marginBottom: 30,
  },
  textStyle: {
    fontSize: 20,
    color: 'black',
    fontWeight:'bold',
    fontStyle:'normal',
  },
  textInputContainer: {
    paddingVertical: 20,
    flex:2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    padding: 10,
    flex:1,
  },
  buttonOptions: {
    flex:3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
})