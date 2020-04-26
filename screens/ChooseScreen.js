import React from 'react';
import {View,Text, StyleSheet,StatusBar,Image} from 'react-native';
import { TextInput, TouchableOpacity, } from 'react-native-gesture-handler';


export default class ChooseScreen extends React.Component{
    
    
 
 
 
     render(){
        
         return(
             <View style={styles.container}>
                 
                 <StatusBar barStyle='light-content'></StatusBar>
 
                 {/* {<Image 
                     source={require('../assets/authHeader.png')}
                     style={{marginTop:-176, marginLeft:-50}}
                 ></Image> */}
 
                 {/* <Image
                     source={require('../assets/authFooter.png')}
                     style={{position:'absolute',bottom:-325,right:-225}}
                 ></Image>
 
                 <Image
                     source={require('../assets/logo.png')}
                     style={{marginTop:-110, alignSelf:'center'}}
                 ></Image> */}
 
 
 
                 <Text style={styles.greeting}>
                     {'I am a...'}
                 </Text>
 
                 
                 
                 
                 
                 <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.navigate("RegisterTutor")}>
                     <Text style={{ color:'#FFF', fontWeight:'500'}}>Tutor</Text>
                 </TouchableOpacity>

                 


                 <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.navigate("Login")} >
                     <Text style={{color:'#FFF', fontWeight:'500'}}>Parent</Text>
                 </TouchableOpacity>
                 
            </View>
        )
    }
};
 
 

 
 
const styles=StyleSheet.create({
     container:{
         flex:1,
    },
 
     greeting:{
         marginTop:32,
         fontSize:18,
         fontWeight:'400',
         textAlign:'center'
     },
 
    
     button:{
         paddingTop:50,
         marginTop:50,
         marginHorizontal:30,
         backgroundColor:'#E9446A',
         borderRadius:4,
         height:52,
         alignItems:'center',
         justifyContent:"flex-end"
     }
});  