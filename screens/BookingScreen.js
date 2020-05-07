import React from 'react';
import {View,Text,StyleSheet,AsyncStorage,FlatList} from 'react-native';
import firebase from "firebase"

var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;
  
  if (user != null) {
    name = user.displayName;
    email = user.email;
    
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                     // this value to authenticate with your backend server, if
                     // you have one. Use User.getToken() instead.
  }

export default  class BookingScreen extends React.Component{
   
    constructor(props){
        
        super(props);
      
        this.state=({
            date:'',
            location:'',
            subject:'',
            
            
            newTaskName:'',
            book:[],
            
            taskName:'',
            loading:false,
            descript:'',
            price:Number,
            myid:''
        });
       
        this.ref=firebase.firestore().collection('todoTasks').doc('1cv4qdZibhdtscNpx6keLz032cK2').collection('booked').doc(uid)
       

        
       
    }

    componentDidMount(){
        
        this.unsubscribe=this.ref.onSnapshot((querySnapshot)=>{
            const todos=[];
            
            querySnapshot.forEach((doc)=>{
                todos.push({ 
                    date:doc.data().bookingDate,
                    location:doc.data().location,
                    subject:doc.data().subject,
                   //myid:doc.id,
                   //tut:doc.id
                    
                });
            });
            this.setState({
                //todoTasks:todos,
                book:todos,
               
                loading:false,
            });
        })

         
    };





    render(){
        return(
            <View style={styles.container}>
            <View style={styles.header}>
       <Text style={styles.headerTitle}>Tutors</Text> 
            </View>


       
       
        <FlatList style={styles.feed}
        showsVerticalScrollIndicator={false}

            
         data={this.state.book}
        renderItem={({item,index})=>{
            return(
                        
                <View style={styles.feedItem}>
                    <Text>{item.location}</Text>
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
        marginVertical:20
    },
    avatar:{
        width:36,
        height:36,
        borderRadius:18,
        marginRight:16
    },

   

   price:{
       fontSize:24,
       paddingTop:100,
       paddingLeft:190
   },
   name:{
       flex:1,
      
       justifyContent:"center",
       paddingLeft:30
   },
  
   buttonText:{
    alignSelf:"center",
       color:'white',
       fontSize:20,
       fontWeight:'bold'
   }
});