import React from 'react';
import {View,Text,StyleSheet,AsyncStorage,FlatList} from 'react-native';
import firebase from "firebase"
import { Button } from 'native-base';
import { Component } from 'react';

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
            id:uid,
            location:'',
            subject:'',
            location1:'',
            subject1:'',
            phone:'',
            buuk:[],
            buuk1:[],
            bookingDate:'',
            bookingDate1:'',

            loading:false,
        });
       
        this.ref=firebase.firestore().collection('todoTasks').doc('1cv4qdZibhdtscNpx6keLz032cK2').collection('booked')
       

        
       
    }

  
    componentDidMount(){
        let cityRef =firebase.firestore().collection('todoTasks').doc('1cv4qdZibhdtscNpx6keLz032cK2').collection('booked').doc(uid)
        let cityRef1 =firebase.firestore().collection('todoTasks').doc('5x1tdqLcgL9zuvjrpI5H').collection('booked').doc(uid)

        const buk1=[]
        const buk=[]
        let getDoc = cityRef.get()
        .then(doc => {
         buk.push({
             location:doc.data().location,
             subject:doc.data().subject,
             bookingDate:doc.data().bookingDate,


         })
         this.setState({
            //todoTasks:todos,
            buuk:buk,
           
            loading:false,
        });
    })
//////////////////////////////////////////
    let getDoc1 = cityRef1.get()
        .then(doc => {
         buk1.push({
             location1:doc.data().location,
             subject1:doc.data().subject,
             bookingDate1:doc.data().bookingDate,


         })
         this.setState({
            //todoTasks:todos,
            buuk1:buk1,
           
            loading:false,
        });
    })
};
_onPressButton1(){
    alert("Succes, you have canceled the lesson ")

    let deleteDoc = firebase.firestore().collection('todoTasks').doc('1cv4qdZibhdtscNpx6keLz032cK2').collection('booked').doc(uid)
    .delete();
  //  let cityRef1 =firebase.firestore().collection('todoTasks').doc('5x1tdqLcgL9zuvjrpI5H').collection('booked').doc(uid)


}
_onPressButton2(){
    alert("Succes, you have canceled the lesson ")

    let deleteDoc = firebase.firestore().collection('todoTasks').doc('5x1tdqLcgL9zuvjrpI5H').collection('booked').doc(uid)
    .delete();


}






    render(){
        return(
            <View style={styles.container}>
            <View style={styles.header}>
       <Text style={styles.headerTitle}>Tutors</Text> 
            </View>
        <Text style={{alignSelf:'center'}}>Below yours upcoming lessons</Text>
          
    <FlatList 
        

            
         data={this.state.buuk}
        renderItem={({item,index})=>{
            return(
                        
                <View style={styles.feedItem} >
                   <Text>Location of lesson:            {item.location}</Text>
                   <Text>The date of  lesson:            {item.bookingDate}</Text>

                   <Text>The name of lesson:            {item.subject}</Text>

                   <Button 
                    onPress={this._onPressButton1}

                   style={{justifyContent:"center",backgroundColor:'#FFD073'}}><Text style={styles.buttonText}>Cancel the  lesson</Text></Button>
                         
                 </View>
                


                    )
                        }}
                    
    ></FlatList>
     <FlatList 
        

            
        data={this.state.buuk1}
       renderItem={({item,index})=>{
           return(
                       
               <View style={styles.feedItem} >
                  <Text>Location of lesson:            {item.location1}</Text>
                  <Text>The date of  lesson:            {item.bookingDate1}</Text>

                  <Text>The name of lesson:            {item.subject1}</Text>
                    <Button
                     
                    onPress={this._onPressButton2}
                    style={{justifyContent:"center",backgroundColor:'#FFD073'}}><Text style={styles.buttonText}>Cancel the  lesson</Text></Button>
                                               
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
        
        marginVertical:20
    },
  
   

  
  
   buttonText:{
    alignSelf:"center",
       color:'white',
       fontSize:20,
       fontWeight:'bold'
   }
});