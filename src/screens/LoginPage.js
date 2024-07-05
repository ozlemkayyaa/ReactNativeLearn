import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { 
  StyleSheet, 
  Text, 
  View , 
  Pressable,
  Image,
} from 'react-native';

import {Loading,CustomTextInput} from '../components/'
import { useSelector, useDispatch } from 'react-redux';
import {setIsLoading} from '../redux/userSlice';
import { login, autoLogin } from '../redux/userSlice';


const LoginPage = ({navigation}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // userSlice içerisindeki verilerin okunması
const {isLoading} = useSelector((state) => state.user)
  // const email2 = useSelector((state) => state.user.email)
  // her iki türlü de kullanabilirsin

  console.log("Email: ", email)
  console.log("Password: ", password)
  console.log("Loading: ", isLoading)

  // userSlice içerisindeki reducer yapılarını kullanma veya veri gönderme
  const dispatch = useDispatch()

  
  // Kullanıcı daha önce giriş yaptıysa, kontrol et ve otomatik giriş yap bebiş
  useEffect(() => {
   dispatch(autoLogin())
  }, [])

  return (
    <View style={styles.container}>

        <Text>WELCOME</Text>

      <Image
        source= {require ('../../assets/favicon.png')}
        style = {styles.image}
      />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Text>Test App!</Text>
      
      <View style = {styles.subContainer}>
        <Text style = {styles.textStyle}>Özlem Kaya</Text>
      </View>

      <CustomTextInput
        title= 'Email'
        isSecureText = {false}
        onChangeText = {(text)=>setEmail(text)}
        value ={email}
        placeholder = 'Enter Your Email'
      />

      <CustomTextInput
        title= 'Password'
        isSecureText = {true}
        onChangeText = {(password)=> setPassword(password)}
        value ={password}
        placeholder = 'Enter Your Password'
      />

      <Pressable 
        onPress={() => dispatch(login({email, password}))}
        //setResult(email + ' ' + password) email ve passwordu bu şekilde ekrana bitişik yazdırabilirsin
        style = {({pressed}) => [{
          backgroundColor: pressed ? 'red' : 'blue',
        }, styles.buttonStyle]}>
        <Text style={styles.textStyle}>Login</Text>
      </Pressable>

      <Pressable 
        onPress={() => navigation.navigate('Signup')}
        //setResult(email + ' ' + password) email ve passwordu bu şekilde ekrana bitişik yazdırabilirsin
        style = {({pressed}) => [{
          backgroundColor: pressed ? 'red' : 'blue',
        }, styles.buttonStyle]}>
        <Text style={styles.textStyle}>Signup</Text>
      </Pressable>

        {isLoading 
        ? <Loading 
          name="ButtonName"
          changeIsLoading={()=> dispatch(setIsLoading(false))}/> 
        : null}

      
    </View>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    backgroundColor: 'red',
    width: '50%',
    height: 75,
    alignItems: 'center', // yatay olarak ortalar
    justifyContent: 'center', // dikey olarak ortalar
    borderRadius: 30,
    borderWidth: 5,
    borderColor: 'blue',
  },
  textStyle: {
    fontSize: 30,
    color: 'white',
    fontWeight:'bold',
    fontStyle:'italic',
  },
  textInputStyle: {
    borderWidth: 1.2,
    width: '80%',
    height: 40,
    borderRadius: 12,
    marginVertical:15,
    textAlign:'center',
  },
  buttonStyle: {
    borderWidth: 1.2,
    width: '80%',
    height: 40,
    borderRadius:12,
    alignItems:'center',
    justifyContent:'center',
    marginTop:15,
  },
  image: {
    height:100,
    width:100,
  }
});
