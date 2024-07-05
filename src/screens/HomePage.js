import { StyleSheet, Text, View, Pressable} from 'react-native'
import React, {useState, useEffect} from 'react'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc} from "firebase/firestore"; 
import { db } from '../../firebaseConfig';
import CustomButton from '../components/CustomButton';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';


const HomePage = () => {

  const [data, setData] = useState([])
  const [isSaved, setIsSaved] = useState(false)

  const dispatch = useDispatch()

  //console.log("data: ", data)

  useEffect(() => {
    getData()
  }, [isSaved])
  

  // SEND DATA TO FIREBASE
  const sendData = async() => {
    try {
      const docRef = await addDoc(collection(db, "reactNativeLessons"), {
        title: "Zero to Hero",
        content: "React Native tutorial for beginner.",
        lesson: 100
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // GET DATA FROM FIREBASE
  const getData = async() => {
    const allData = []
    try {
      const querySnapshot = await getDocs(collection(db, "reactNativeLessons"));
        querySnapshot.forEach((doc) => {
        // bir tane veri çekmek için
        //console.log(`${doc.id} => ${doc.data()}`);
        // setData([...data, doc.data()]);
        // bütün verileri çekmek için
        allData.push({...doc.data(), id: doc.id})
    });
    setData(allData);
    } catch (error) {
      console.log(error)
    }
  }

  // DELETE DATA FROM FIREBASE
  const deleteData = async(value)=>{
    try {
      await deleteDoc(doc(db, "reactNativeLessons", value));
      console.log("Delete succesfull")
    } catch (error) {
      console.log(error)
    }
  }

  // UPDATE DATA FROM FIREBASE
  const updateData = async()=>{
    try {
      const lessonData = doc(db, "reactNativeLessons", "0p2qNo0PqC844rDL4JhQ");

      // Set the "capital" field of the city 'DC'
      await updateDoc(lessonData, {
        lesson: 190
      });
    } catch (error) {
      console.log(error)
    }
  }


  // Logout
  const handleLogout = ()=>{
    dispatch(logout())
  }


  return (
    <View style = {styles.container}>

      {data.map((value, index)=> {
        return (
          <Pressable 
            onPress= {() => [deleteData(value.id), setIsSaved(isSaved === false ? true : false)]}
            key={index}>
            <Text>{index}</Text>
            <Text>{value.id}</Text>
            <Text>{value.title}</Text>
            <Text>{value.content}</Text>
            <Text>{value.lesson}</Text>
          </Pressable>
        )
      })}
    
      <CustomButton 
        buttonText={"Save"}
        setWidth={"40%"}
        buttonColor={"red"}
        pressedButtonColor={"gray"}
        handleOnPress={()=>{sendData(), setIsSaved(isSaved === false ? true : false)}}
      />

      <CustomButton 
        buttonText={"Get Data"}
        setWidth={"40%"}
        buttonColor={"red"}
        pressedButtonColor={"gray"}
        handleOnPress={getData}
      />

      <CustomButton 
        buttonText={"Delete"}
        setWidth={"40%"}
        buttonColor={"red"}
        pressedButtonColor={"gray"}
        handleOnPress={deleteData}
      />

      <CustomButton 
        buttonText={"Update"}
        setWidth={"40%"}
        buttonColor={"red"}
        pressedButtonColor={"gray"}
        handleOnPress={updateData}
      />

      <CustomButton 
        buttonText={"Logout"}
        setWidth={"40%"}
        buttonColor={"red"}
        pressedButtonColor={"gray"}
        handleOnPress={handleLogout}
      />
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'red',
    fontWeight:'bold',
    marginVertical:8,
    fontSize:16,
  }
})

/* 
import Home from '../components/Home'
import Home1 from '../components/Home1'
import Home2 from '../components/Home2'

  const [verininDepolandigiYer, setVerininDepolandigiYer] = useState('')

  const veriler = ['Özlem', 'Kaya', 'Emirhan', 'Balci']

  const veri1 = "Edinburg"
  const veri2 = "Meksika"

  const veri3 = "Tanzanya"
  const veri4 = "Sri Lanka"

      <Text >INDEX SAYISINI KULLANARAK ARRAY GÖNDERİLMESİ</Text>
      <Home gonderilenVeriler = {veriler} />

      <Text >MAIN COMPONENT İÇİNDE AYNI CHİLD COMPONENTI BİRDEN FAZLA KULLANMAK</Text>
      <Home1 ilk={veri1} ikinci={veri2}/>
      <Home1 ilk={veri3} ikinci={veri4}/>

      
      <Text>{verininDepolandigiYer}</Text>
      <Home2 veriPropsIsmi = {setVerininDepolandigiYer} /> */