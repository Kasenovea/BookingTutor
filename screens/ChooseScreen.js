import React from 'react';
import {View,Text, StyleSheet,StatusBar,Image} from 'react-native';
import { TextInput, TouchableOpacity, } from 'react-native-gesture-handler';


export default class ChooseScreen extends React.Component{
    
    
 
 
 
     render(){
        
         return(
             <View style={styles.container}>
                 
                 <StatusBar barStyle='light-content'></StatusBar>
 
                
 
 
 
                 <Text style={styles.greeting}>
                     {'I am a...'}
                 </Text>
 
                 
                 
                 
                 
                 <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.navigate("RegisterTutor")}>
                     <Text style={{ color:'#FFF', fontSize:20,fontWeight:"bold"}}>Tutor</Text>
                 </TouchableOpacity>

                 


                 <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.navigate("Login")} >
                     <Text style={{color:'#FFF',fontSize:20, fontWeight:"bold"}}>Student</Text>
                 </TouchableOpacity>
                 


         <Text style={{paddingTop:200, alignSelf:"flex-start"}} >press Tutor button if you are tutor

                 </Text>
                 <Text style={{ alignSelf:"flex-start"}} >press Student button if you are looking for a tutor

                 </Text>
            </View>
        )
    }
};
 
 

 
 
const styles=StyleSheet.create({
     container:{
         flex:1,
         backgroundColor:"#EFECF4"
    },
 
     greeting:{
         marginTop:32,
         fontSize:18,
         fontWeight:'400',
         textAlign:'center'
     },
 
    
     button:{
         paddingTop:10,
         marginTop:50,
         marginHorizontal:30,
         backgroundColor:'#05A586',
         borderRadius:4,
         height:52,
         alignItems:'center',
         justifyContent:"center"
     }
});  