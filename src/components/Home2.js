import {Button, View,} from 'react-native'
import React from 'react'

const Home2 = (props) => {
    const gidenVeri = "Componenet'den geliyorr"
  return (
    <View>
       <Button title = 'Verileri Getir' onPress={()=> props.veriPropsIsmi(gidenVeri)}></Button>
    </View>
  )
}

export default Home2