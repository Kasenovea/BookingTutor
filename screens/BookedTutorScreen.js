import React ,{Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Image} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import firebase, { auth } from 'firebase'
import { Button } from "native-base";
import Fire from "../Fire";
import { TextInput } from "react-native-gesture-handler";




var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;
  
  if (user != null) {
    name = user.displayName;
    email = user.email;
    
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                     // this value to authenticate with your backend server, if
                     // you have one. Use User.getToken() instead.
  }



export default class BookedTutorScreen extends React.Component{


    constructor(props){
       
        super(props);
       
        this.state=({
            
            subject:'',
            bookingDate:'',
            location:'',
            name:'',
            phone:'',
            myid:uid,
            newTaskName:'',
            todoTasks:[],
            date_local:'',
            taskName:'',
            loading:false,
            descript:'',
            price:Number,
            
            user_name:name
        });
       
        this.ref=firebase.firestore().collection('todoTasks').doc(uid).collection('booked')
       

        
       // this.ref=firebase.firestore().collection('todoTasks');
    }




  

  
    componentDidMount(){
        this.unsubscribe=this.ref.onSnapshot((querySnapshot)=>{
            const todos=[];
            
            querySnapshot.forEach((doc)=>{
                todos.push({ 
                    taskName:doc.data().name,
                    bookingDate:doc.data().bookingDate,
                    location:doc.data().location,
                    subject:doc.data().subject,
                    phone:doc.data().phone
                   //myid:doc.id
                    
                });
            });
            this.setState({
                //todoTasks:todos,
                todoTasks:todos,
               
                loading:false,
            });
        })
      
         
    };

        
    



    


   

    render(){

       return(
            <View style={styles.container}>
                 <View style={styles.header}>
                          <Text style={styles.headerTitle}>Upcoming lessons </Text>
                </View>
               
                
      
               
                 
     <FlatList style={styles.feed}
        showsVerticalScrollIndicator={false}


         data={this.state.todoTasks}
            renderItem={({item,index})=>{

            return(
                        
                <View style={styles.feedItem}>
                     
                    <Text style={{ fontSize:20}}>{item.taskName}</Text>
                                
                              <View style={{justifyContent:"flex-start"}}>     

            <Text>subject:{item.subject}{'\n'}{'\n'}location:{item.location}</Text></View>
                                  
            <View style={{justifyContent:"center"}}>
                               <Text>The date of lesson:{item.bookingDate}</Text></View>
                                                
                 
                                   
                                                
                                                                 
                                                
                 </View>
                              
                                                                    


                    )
                        }}
                    
    ></FlatList>
                    
                    






            
  
    </View>

            
        );
    }
}






const styles =StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#EFECF4'
    },
    header:{
        paddingTop:34,
        paddingBottom:6,
        backgroundColor:'#7AD0FF',
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:'#EBECF4',
        borderBottomWidth:1,
        shadowColor:"#454D65",
        shadowOffset:{height:5},
        shadowRadius:15,
        shadowOpacity:0.2,
        zIndex:10
    },
    descript:{
        justifyContent:'center',
        fontSize:20
    },
    headerTitle:{
        fontSize:20,
        fontWeight:'500',
        color:'white',
        fontWeight:'bold',
        borderBottomWidth:1

    },
    
    feedItem:{
        backgroundColor:'#FFF',
        borderRadius:5,
        padding:8,
        flexDirection:'row',
        marginVertical:8,
        height:200
    },

    button:{
        
        
        
        
        backgroundColor:'#05A586',
        //borderRadius:15,
        justifyContent:'center',
        alignItems:'center'
      
      },
     
     
      goback:{
        

        
        
        backgroundColor:'#034B5C',
        //borderRadius:30,
        justifyContent:'center',
        alignItems:'center'
         
      
      
      }
})