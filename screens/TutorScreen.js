import React from 'react';
import {
    StyleSheet,
    FlatList,Text,
     View,TextInput,
     Linking,
     
     TouchableOpacity,BackHandler} from "react-native";
import firebase from "firebase";
import { Button } from 'native-base';



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
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state=({
            mobile_no:'',
            msg:'zczczczc',
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
            mob_no:'',
            
            user_name:name
        });
        this.ref=firebase.firestore().collection('todoTasks').doc(uid).collection('booked')
       
       // this.ref=firebase.firestore().collection('todoTasks').doc(this.state.id)
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
                    phone:doc.data().phone,
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
   
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }
   
    sendOnWhatsApp=() => {
        let msg = this.state.msg;
        let mobile = this.state.mobile_no;
        if(mobile){
          if(msg){
            let url = 'whatsapp://send?text=' + this.state.msg + '&phone=+7' + this.state.mobile_no;
            Linking.openURL(url).then((data) => {
              console.log('WhatsApp Opened');
            }).catch(() => {
              alert('Make sure Whatsapp installed on your device');
            });
          }else{
            alert('Please insert message to send');
          }
        }else{
          alert('Please insert mobile no');
        }
      }
    
    render(){
        return(
            <View style={styles.container}>
            <View style={styles.header}>
                  <Text style={styles.headerTitle}>For tutor</Text>
            </View>

            <TouchableOpacity style={{marginTop:10, backgroundColor:'#05A586', height:50,justifyContent:"center", alignSelf:'auto'}} onPress={() =>  this.props.navigation.navigate("BeTutor")}>
      
            <Text style={{alignSelf:"center",color:"white",fontSize:20}} >Propose tutoring</Text>
      </TouchableOpacity>
      
      
      <Text style={{alignSelf:"auto",marginTop:20, color:"white",height:30,fontSize:20,backgroundColor:"#778899"}} >Upcoming lessons for tutor</Text>

<FlatList style={styles.feed}
        showsVerticalScrollIndicator={false}


         data={this.state.todoTasks}
            renderItem={({item,index})=>{
                this.state.mobile_no=item.phone

            return(
                        
                <View style={styles.feedItem}>
                     
                    
                    <Text style={{ fontSize:20}}>{item.taskName}</Text>
                                
                            <View  style={{  flexDirection:"row"}} >      
                                        
                 
                                <Text style={{ fontSize:15}} >{'\n'}subject:{item.subject}</Text>
                                <Text style={{ fontSize:15}}>{'\n'}            location:{item.location}</Text>


                           
                            </View>
                            <View style={styles.container}>

                            <Text style={{fontSize:18, alignSelf:"center",alignItems:"flex-start"}}>{'\n'}{'\n'} Booking date: {item.bookingDate}</Text>
            <Text style={{alignSelf:"center", fontSize:18}}>Phone number {item.phone}</Text>
        <Text style={{textAlign: 'center', fontSize: 20}}>
          Click button to contact student
        </Text>
     
        
        <View style={{marginTop:20}}>
          <Button
          style={{backgroundColor:"green",justifyContent:"center"}}
            onPress={this.sendOnWhatsApp}
            title= 'Send WhatsApp Message'
            ><Text style={{color:"white", fontSize:18}}>Submit
               </Text></Button>
        </View>
      </View>




              
              
              
              
              
              
              
              
              
              
              
              
              
              
                 </View>  )
                        }}
                    
    ></FlatList>
                    
     
              

              



               

                
               
</View>     
        )
    }
   }




   const styles =StyleSheet.create({
    container:{
        flex:1,
        //justifyContent:'center',
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
    headerTitle:{
        fontSize:20,
        fontWeight:'500',
        color:'white',
        fontWeight:'bold',
        borderBottomWidth:1

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
        backgroundColor:'white',
        borderRadius:5,
        padding:8,
        //flexDirection:'row',
        marginVertical:8,
        height:300
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