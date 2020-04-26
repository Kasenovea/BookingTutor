import React ,{Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Image} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import firebase, { auth } from 'firebase'
import { Button } from "native-base";
import Fire from "../Fire";
import { TextInput } from "react-native-gesture-handler";








export default class HomeScreen extends React.Component{


    constructor(props){
       
        super(props);
       
        this.state=({
            
            

            newTaskName:'',
            todoTasks:[],
            
            taskName:'',
            loading:false,
            descript:'',
            price:Number,
            myid:''
        });
       
        this.ref=firebase.firestore().collection('todoTasks')
       

        
       // this.ref=firebase.firestore().collection('todoTasks');
    }




  

  
    componentDidMount(){
        this.unsubscribe=this.ref.onSnapshot((querySnapshot)=>{
            const todos=[];
            
            querySnapshot.forEach((doc)=>{
                todos.push({ 
                    taskName:doc.data().taskName,
                    descript:doc.data().descript,
                    price:doc.data().price,
                   myid:doc.id
                    
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
        <Text style={styles.headerTitle}>Tutors </Text>
                </View>
               
                
      
               
                 
                 















             

            
    <FlatList style={styles.feed}
        showsVerticalScrollIndicator={false}


         data={this.state.todoTasks}
        renderItem={({item,index})=>{

            return(
                        
                <View style={styles.feedItem}>
                     <TouchableOpacity  onPress={()=> this.props.navigation.navigate("ConfirmTutor",{json_list:item.myid} )}>
                            <Image source={require('../assets/ava2.jpg')} style={styles.avatar}/>
                           
                                <Text style={{ paddingLeft:40, fontSize:20}}>{item.taskName}</Text>

                               
                                    <View >
                                        <View style={styles.descript}>    
                                            
                                                        
                                                
                                                 <Text style={styles.name}>{item.descript}</Text>
                                                 
                                             
                                            
                                                       
                                        </View>
                                                <View style={{top:100,alignSelf:"center",backgroundColor:'#778899',height:40}}>
                                                    <Text style={styles.buttonText}>
                                                    tap here to book a lesson
                                                    </Text></View>
                                        
                                        
                                                <Text style={styles.price}>
                                                <Ionicons  name='logo-euro' size={24} color={'#FFAF7A'}/>{item.price}
                                                </Text>
                                                
                                    </View>

                                                
                                     <Button   onPress={() => this.props.navigation.navigate('ReviewScreen',{json_list:item.myid})} style={{backgroundColor:'#05A586', width:315,justifyContent:'center'}}>
                                         <Text style={styles.buttonText}>see the reviews</Text>
                                                    
                                    </Button>  
                                                
                        </TouchableOpacity>
                                                
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
    avatar:{
        width:36,
        height:36,
        borderRadius:18,
        marginRight:16
    },
   timestamp:{
       fontSize:11,
       color:'#C4C6CE',
       marginTop:4
   },
   
   post:{
       marginTop:16,
       fontSize:14,
       color:'#838899'
   },
   postImage:{
       width:undefined,
       height:150,
       borderRadius:5,
       marginVertical:16
   },
   price:{
       fontSize:24,
       paddingTop:100,
       paddingLeft:260
   },
   name:{
       flex:1,
       justifyContent:"center",
       paddingLeft:30
   },
  
   buttonText:{
       color:'white',
       fontSize:20,
       fontWeight:'bold'
   }
});