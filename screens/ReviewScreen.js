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



export default class ReviewScreen extends React.Component{


    constructor(props){
       
        super(props);
       
        this.state=({
            
            
            myid:uid,
            newTaskName:'',
            todoTasks:[],
            date_local:'',
            taskName:'',
            loading:false,
            descript:'',
            price:Number,
            iid:props.navigation.state.params.json_list,
            user_name:name
        });
       
        this.ref=firebase.firestore().collection('todoTasks').doc(this.state.iid).collection('reviews')
       

        
       // this.ref=firebase.firestore().collection('todoTasks');
    }




  

  
    componentDidMount(){
        this.unsubscribe=this.ref.onSnapshot((querySnapshot)=>{
            const todos=[];
            
            querySnapshot.forEach((doc)=>{
                todos.push({ 
                    taskName:doc.data().name,
                    text:doc.data().text,
                    date:doc.data().date,
                   //myid:doc.id
                    
                });
            });
            this.setState({
                //todoTasks:todos,
                todoTasks:todos,
               
                loading:false,
            });
        })
        var that = this;
        var date1 = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        that.setState({
          //Setting the value of the date time
          date_local:
            date1 + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
        });
         
    };

        
    onPressAdd=()=>{
        if(this.state.u_text.trim()===''){
          alert("you add nothing ,please add");
          return
      }
        let setWithOptions = this.ref
        .doc(this.state.myid)
        .set({
          date: this.state.date_local,
          text:this.state.u_text,
          //subject:this.state.ChosenSubject,
          //phone:this.state.phone_user,
          name:this.state.user_name
        }, {merge: true});
    
        if (this.state.u_text.trim()!==''){
          alert("Succes, you've created a review  ")
          return
        }
    
    
      }



    


   

    render(){

       return(
            <View style={styles.container}>
                 <View style={styles.header}>
                          <Text style={styles.headerTitle}>Reviews  </Text>
                </View>
               
                
      
               
                 
     <FlatList style={styles.feed}
        showsVerticalScrollIndicator={false}


         data={this.state.todoTasks}
            renderItem={({item,index})=>{

            return(
                        
                <View style={styles.feedItem}>
                     
                    <Text style={{ fontSize:20}}>{item.taskName}</Text>

                               
                                    <View style={styles.text} >
                                         
                                            
                                    <Text style={{alignItems:'center'}}>
                                                                {item.date}
                                                                    </Text>
                                                
                                                 <Text>{item.text}</Text>
                                               
                                                 </View>
                                                 <View style={styles.date} > 
                                                     
                                                </View>
                 
                                   
                                                
                                                                 
                                                
                 </View>
                              
                                                                    


                    )
                        }}
                    
    ></FlatList>
                    
                    


                    <Text style={{fontSize:20,alignSelf:"center",borderBottomWidth:2 }} >Leave a review to tutor below</Text>
<TextInput
          value={this.state.u_text}
          onChangeText={u_text => this.setState({ u_text })}
          placeholder={'write your review here'}
          style={{fontSize:17}}

         
        />




            
  <TouchableOpacity
      style={styles.button}
      
      onPress={this.onPressAdd}>
      <Text style={{fontSize:25,color:'white'}}>Send a review</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.goback} onPress={()=> this.props.navigation.navigate("App")} >
                     <Text style={{fontSize:25,color:'white'}} >Go back to tutors</Text>
                 </TouchableOpacity>
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
    feed:{
        marginHorizontal:16
    },
    feedItem:{
        backgroundColor:'#FFF',
        borderRadius:5,
        padding:8,
        flexDirection:'row',
        marginVertical:8
    },
    text:{
        width:"100%",
        alignItems:'center',
        marginVertical:10
    },
    date:{
        alignItems:"baseline"
        
       

        
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