import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = (props) => {
    
  return (
    <View >
        <Text>{props.gonderilenVeriler[0]}</Text>
        <Text>{props.gonderilenVeriler[1]}</Text>
        <Text>{props.gonderilenVeriler[2]}</Text>
        <Text>{props.gonderilenVeriler[3]}</Text>
     
      <Text>Home Component</Text>
      
    </View>
  )
}

export default Home