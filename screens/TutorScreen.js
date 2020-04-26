import React from 'react';
import {AppRegistry,Image,
    StyleSheet, ActivityIndicator,
    FlatList,Text,
     View,TouchableHighlight,
     RefreshControl,TextInput,
     Alert, Platform, ImageBackground,TouchableOpacity} from "react-native";
import firebase from "firebase";
import Fire from "../Fire";
import { Item } from 'native-base';



var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;
  
  if (user != null) {
    name = user.displayName;
    email = user.email;
    
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                     // this value to authenticate with your backend server, if
                     // you have one. Use User.getToken() instead.
  }







export default class TutorScreen extends React.Component{

    constructor(props){
        super(props);
        this.state=({
            //todoTasks:[],
            //todoTasks:[],
            newTaskName:'',
            todoTasks:[],
            image:null,
            taskName:'',
            loading:false,
            subject:'',
            id:'',
            id:uid,
            
        });
       
        this.ref=firebase.firestore().collection('todoTasks').doc(this.state.id)
       // this.ref=firebase.firestore().collection('todoTasks');
    }

    componentDidMount(){
        this.unsubscribe=this.ref.onSnapshot((querySnapshot)=>{
            const todos=[];
            
            querySnapshot.forEach((doc)=>{
                todos.push({ 
                    taskName:doc.data().subject,
                    //taskName:doc.data().taskName,
                    
                    
                });
            });
            this.setState({
                //todoTasks:todos,
                todoTasks:todos,
               
                loading:false,
            });
        })
    }


    onPressAdd=()=>{
        if(this.state.newTaskName.trim()===''){
            alert("you add nothing ,please add");
            return
        }
        this.ref.add({
            
            taskName:this.state.newTaskName,
            
        }).then((data)=>{
            console.log('added data=${data}');
            this.setState({
                newTaskName:'',
                
                loading:true
            });

        }).catch((error)=>{
            console.log('erroraas')
            this.setState({
                newTaskName:'',
                
                loading:true
            });

        });
    }

    render(){
        return(
            <View style={{flex:1, marginTop:Platform.OS==='android'     ?34:0}}>

                <View style={{
                    backgroundColor:'tomato',
                    flexDirection:'row',
                    justifyContent:'flex-end',
                    alignItems:'center',
                    height:64
                }}>

                <TextInput style={{
                    height:40,
                    width:200,
                    margin:10,
                    padding:10,
                    borderColor:"white",
                    borderWidth:1,
                    color:'white'
                }}

                keyboardType='default'
                placeholderTextColor='black'
                placeholder='enter taskname'
                autoCapitalize='none'
                onChangeText={
                    (text)=>{
                        this.setState({newTaskName:text});
                    }
                }
                />

                <TouchableHighlight
                    style={{marginRight:10}}
                    underlayColor='tomato'
                    onPress={this.onPressAdd}
                    >
                        <Image
                            style={{width:35,height:35}}
                            source={require('../assets/ava3.jpg')}/>
                    </TouchableHighlight>


                </View>

                
               
                <FlatList

                    //data={this.state.todoTasks}
                    data={this.state.todoTasks}
                    renderItem={({item,index})=>{
                        return(
                        


                            <Text style={{
                                fontSize:20,
                                fontWeight:'bold',
                                margin:40,
                                underlayColor:'tomato'
                             }}> {item.taskName}</Text> 





                        )
                        }}
                        //keyExtractor={(item,index)=>item.taskName}
                    ></FlatList>
            </View>
        )
    }
   }




