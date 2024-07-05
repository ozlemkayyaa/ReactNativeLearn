// kısa yol rnfes

import { StyleSheet, Text, View , ActivityIndicator, Pressable} from 'react-native'
import React from 'react'

const Loading = ({name,changeIsLoading}) => {
{/* Burada doğrudan props yazarsan tüm propsları alır, eğer props sayın azsa okunaklı olması adına propsların isimlerini yazman daha doğru
    props yazarsan kullanırkende  {props.name} şeklinde kullanman gerekir,
    propsun azsa buraya {yazdığın tüm propsları eklersen} kullandırkende sadece {name} şeklinde kullanmış olursun */}
  return (
    <View style = {styles.container}>
        <Pressable 
        onPress={()=> changeIsLoading()}
        style = {[{}, styles.closeButtonContainer]}>
            <Text style={styles.closeButton}>Close</Text> 
        </Pressable>

        <ActivityIndicator size={'large'} color= {'blue'} />
      
{/* Size loading in büyüklüğünü gösterir 2 adet var, small ve large, istersen rengini istediğin gibi değiştirebilrsin */}
{/* BU HTML TAGleri arasına JS kodu yazmak istersen {} parantezinin içine yazman gerekli */}
      <Text style =  {styles.loginText}> {name} Loading...</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'tomato',
        alignContent:'center',
        justifyContent: 'center',
    },
    loginText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 20,
        color: 'white',
        textAlign:'center',
    },
    closeButton:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    closeButtonContainer: {
        backgroundColor: 'black',
        width:'50',
        height: '50',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 50,
    },
})
