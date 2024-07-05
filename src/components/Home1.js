import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home1 = (props) => {
  return (
    <View>
      <Text>Home1</Text>
      <Text>{props.ilk} </Text>
        <Text>{props.ikinci} </Text>
        
    </View>
  )
}

export default Home1