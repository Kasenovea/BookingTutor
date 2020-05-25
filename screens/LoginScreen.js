import React,{ useState,useEffect } from 'react';
import {AsyncStorage, View,Text, StyleSheet,StatusBar,Image,Button} from 'react-native';
import { TextInput, TouchableOpacity, } from 'react-native-gesture-handler';
import  firebase from 'firebase';
import * as Facebook from 'expo-facebook'
console.disableYellowBox = true;

import * as Google from "expo-google-app-auth"




export default class LoginScreen extends React.Component{
   











    
    state={
       
        email:'',
        password:'',
        errorMessage:null
    };
   
    
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            if(user!=null){
                console.log(user)
            }
        })
    }



    hadleLogin=()=>{
        const {email,password}=this.state
        firebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .catch(error=>this.setState({errorMessage:error.message}));
    };

    


    
        async  logIn() {
            try {
              await Facebook.initializeAsync('254913562402787');
              const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
              } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile'],
              });
              if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const credential=firebase.auth.FacebookAuthProvider.credential(token)
                firebase.auth().signInWithCredential(credential)
               // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                //Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
              } else {
                // type === 'cancel'
              }
            } catch ({ message }) {
              alert(`Facebook Login Error: ${message}`);
            }
          }


         async logen  () {
            try {
              const result = await Google.logInAsync({
                androidClientId: 295072493392-ssf8n83ufg953voho53fulf6rhp6uqtu.apps.googleusercontent.com,
                scopes: ['profile', 'email'],
              });
          
              if (result.type === 'success') {

                const credential=firebase.auth.GoogleAuthProvider.credential(token)
                firebase.auth().signInWithCredential(credential)
              } else {
                return { cancelled: true };
              }
            } catch (e) {
              return { error: true };
            }
          }




    render()
    
    
    
    
  

    
    {


       
        return(

            
            <View style={styles.container}>
            















              

                

                <Text style={styles.greeting}>
                    {'Hello  \nWelcome to MiTutor \nto continue sign in please'}
                </Text>
                
                <View style={styles.errorMessage}>
                   {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                
                
                
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email address</Text>
                        <TextInput 
                        style={styles.input} 
                        autoCapitalize='none'
                        onChangeText={email=>this.setState({email})}
                        value={this.state.email}
                        placeholder="erbol.kasenov@mail.polimi.it"
                        ></TextInput>
                    </View>


                    <View style={{marginTop:32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput 
                        style={styles.input} 
                        secureTextEntry 
                        autoCapitalize='none' 
                        onChangeText={password=>this.setState({password})}
                        value={this.state.password}
                        
                        
                        ></TextInput>
                    </View>


                </View>

                <TouchableOpacity style={styles.button} onPress={this.hadleLogin} >
                    <Text style={{color:'#FFF', fontWeight:'500'}}>Sign in</Text>
                </TouchableOpacity>
              

                
                <TouchableOpacity style={{alignSelf:'center', marginTop:12}} onPress={()=>this.props.navigation.navigate("Register")}>

                    <Text style={{color:'#414959', fontSize:13}}>
                        new to social? <Text style={{fontWeight:'500',color:'#05A586'}}>Register</Text>
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{backgroundColor:'#3B5998',alignItems:"center",marginTop:32 }}
                onPress={()=>this.logen()}
                                >
                    <Text style={{color:'#FFF', height:30, fontWeight:'500'}}>Sign in with Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor:'#176BEF',alignItems:"center"}} 
                onPress={()=>this.logIn()}
                >
                    <Text style={{color:'#FFF', height:30,fontWeight:'500'}}>Sign in with Google</Text>
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

    errorMessage:{
        height:72,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:30
    },
    form:{
        marginBottom:48,
        marginHorizontal:30
    
    },
    error:{
        color:'#8A8F9E',
        fontSize:13,
        fontWeight:'600',
        textAlign:'center'
    },


    inputTitle:{
        color:'#8A8F9E',
        fontSize:10,
        textTransform:'uppercase'

    },
    input:{
        borderBottomColor:'#8A8F9E',
        borderBottomWidth:StyleSheet.hairlineWidth,
        height:40,
        fontSize:15,
        color:'#161F3D'
    },
    button:{
        marginHorizontal:30,
        backgroundColor:'#05A586',
        borderRadius:4,
        height:52,
        alignItems:'center',
        justifyContent:'center'
    }
});  