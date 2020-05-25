import React from 'react';
import {View,Text, StyleSheet, Image,StatusBar} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons'
import  firebase from 'firebase';



export default class RegisterTutor extends React.Component{
   
    state={
        name:"",
        email:"",
        password:"",
        errorMessage:null
    };

    handleSignUp=()=>{
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(userCredentials =>{ return userCredentials.user.updateProfile({displayName:this.state.name});}).catch(error => this.setState({errorMessage:error.message}));
    };

   


    render(){
        return(
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                
                <TouchableOpacity style={styles.back} onPress={()=>this.props.navigation.goBack()}>
                   
                </TouchableOpacity>

                
                
                
                <Text style={styles.greeting}>
                    {'Hello  \nsign up to get started'}
                </Text>
                
                <View style={{position:'absolute', top:64, alignItems:'center',width:'100%'}}>
                   
                    <TouchableOpacity style={styles.avatar}>
                        <Ionicons name="ios-add" size={40} color="#FFF" style={{marginTop:46, marginLeft:2}}>
                            
                        </Ionicons>
                    </TouchableOpacity>

                </View>

                <View style={styles.errorMessage}>
                   {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                
                
                
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Full name</Text>
                        <TextInput 
                        style={styles.input} 
                        autoCapitalize='none'
                        onChangeText={name=>this.setState({name})}
                        value={this.state.name}
                        ></TextInput>
                    </View>

                    <View style={{marginTop:32}}>
                        <Text style={styles.inputTitle}>Email address</Text>
                        <TextInput 
                        style={styles.input} 
                        autoCapitalize='none'
                        onChangeText={email=>this.setState({email})}
                        value={this.state.email}
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

                
                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{color:'#FFF',fontWeight:'500'}}>Register</Text>
                </TouchableOpacity>
                
                
                <TouchableOpacity 
                    style={{alignSelf:'center', 
                    marginTop:32}} 
                    onPress={()=>this.props.navigation.navigate("Login")}>

                    <Text style={{color:'#414959', fontSize:13}}>
                        Already have account? <Text style={{fontWeight:'500',color:'#E9446A'}}>Login</Text>
                    </Text>
                </TouchableOpacity>


            </View>
        )
    }
}





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
    button:{
        marginHorizontal:30,
        backgroundColor:'#E9446A',
        borderRadius:4,
        height:52,
        alignItems:'center',
        justifyContent:'center'
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
  
   
   
});  