import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const CustomTextInput = ({title, isSecureText, onChangeText, value,placeholder}) => {
  return (
    <View style ={styles.container} >
        <Text>{title} </Text>
      <TextInput 
        secureTextEntry={isSecureText}
        inputMode='email'
        placeholder={placeholder}
        style={styles.textInputStyle}
        onChangeText={onChangeText}
        value = {value}
      />
    </View>
  )
}

export default CustomTextInput

const styles = StyleSheet.create({
    container: {
        width:'80%'
    },
    textInputStyle: {
        borderWidth: 1.2,
        width: '100%',
        height: 40,
        borderRadius: 12,
        marginVertical:15,
        textAlign:'center',
      },
})