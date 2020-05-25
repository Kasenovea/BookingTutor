import React, { Component, useState } from 'react';
import { AppRegistry,Text, View, Button, StyleSheet ,TextInput,AsyncStorage, Linking,Alert,TouchableHighlight,Image} from 'react-native';
import DateTimePicker, {DateTimePickerModal} from "react-native-modal-datetime-picker"
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from "moment"
import RNPickerSelect from "react-native-picker-select"

import firebase from "firebase";
import Fire from "../Fire";






var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;
  
  if (user != null) {
    name = user.displayName;
    email = user.email;
    
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                     // this value to authenticate with your backend server, if
                     // you have one. Use User.getToken() instead.
  }


export default class ConfirmTutor extends React.Component{

  constructor(props){
      super(props)
      this.inputRefs={}
      this.state={
        user_name:name,
        phone_user:'',
        iid:props.navigation.state.params.json_list,
        ChosenSubject:undefined,
      items:[
        {
          label:'English',
          value:'english',
        },
        {
          label:'Mathematics',
          value:'math'
        },
        {
          label:'Physics',
          value:'physics'
        },
        {
          label:'Baby-sitting',
          value:'baby'
        },
        {
          label:'Hacking',
          value:'hacking'
        },
        ],
      chosenPlace:undefined,
      items2:[
        {
          label:'at home',
          value:'home',
        },
        {
          label:'in co-working',
          value:'cowork',
        },
        {
          label:'online',
          value:'online',
        },
        {
          label:'in tutor place  ',
          value:'tutorplace',
        }
        ],


        isVisible:false,
        chosenDate:''
      },

      
      

      this.ref=firebase.firestore().collection('todoTasks').doc(this.state.iid).collection('booked').doc(uid)




  }

  onPressAdd=()=>{
    if(this.state.chosenDate.trim()===''){
      alert("you add nothing ,please add");
      return
  }
    
    let setWithOptions = this.ref.set({
      bookingDate: this.state.chosenDate,
      location:this.state.chosenPlace,
      subject:this.state.ChosenSubject,
      phone:this.state.phone_user,
      name:this.state.user_name
    }, {merge: true});

    if (this.state.chosenDate.trim()!==''){
      alert("Succes, you've created lesson,go Home and check ")
      return
    }


  }
//     this.ref.add({
        
//         chosenDate:this.state.chosenDate,
        
//     }).then((data)=>{
       
//        // console.log('added data=${data}');
//         this.setState({
//             chosenDate:'',
            
//             //loading:true
//         });
      

//     }).catch((error)=>{
//        // console.log('erroraas')
//         this.setState({
//             chosenDate:'',
            
//             //loading:true
//         });

//     });
    
// }
















  





  handlePicker=(datetime)=>{
    this.setState({
      isVisible:false,
      chosenDate:moment(datetime).format('MMMM,Do YYYY HH:mm')
    })
  }

  showPicker=()=>{
    this.setState({
      isVisible:true
    })
  }

  hidePicker=(datetime)=>{
    this.setState({
      isVisible:false,
      
    })
  }



  
///////////////////////
 render(){

 //const{navigate}=this.props.navigation;

  return(
    ///////////////////
    <View style={styles.container}>
<View style={styles.header}>
      <Text style={styles.headerTitle}>
                 Please select and fill all fields to book the lesson
      </Text>
      </View>
 
       


      <View style={{ paddingVertical: 5 }} />

                <Text>Choose subject which wanna learn</Text>
            <RNPickerSelect
                    placeholder={{
                        label: 'Select a subject...',
                        value: null,
                    }}

                    items={this.state.items}
                    onValueChange={(value) => {
                        this.setState({
                            ChosenSubject: value,
                        });
                    }}

                    onUpArrow={() => {
                        this.inputRefs.name.focus();
                    }}

                    onDownArrow={() => {
                        this.inputRefs.picker2.togglePicker();
                    }}

                    
                    value={this.state.ChosenSubject}

                   ref={(el) => {
                        this.inputRefs.picker = el;
                     }}
                    useNativeAndroidPickerStyle={true} //android only
                    hideIcon={false}
            />

         <View style={{ paddingVertical: 5 }} />


                <Text>Choose where you want to learn</Text>
            <RNPickerSelect
                    placeholder={{
                        label: 'Select a place...',
                        value: null,
                    }}
                    items={this.state.items2}
                    onValueChange={(value) => {
                        this.setState({
                            chosenPlace: value,
                        });
                    }}
                    onUpArrow={() => {
                        this.inputRefs.picker.togglePicker();
                    }}
                    onDownArrow={() => {
                        this.inputRefs.company.focus();
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.chosenPlace}
                    ref={(el) => {
                        this.inputRefs.picker2 = el;
                    }}
                    useNativeAndroidPickerStyle={true} //android only
            />

         <View style={{ paddingVertical: 5 }} />

                
            






                





















                      
    
        <Text  >Your date is{this.state.chosenDate}Click icon to choose</Text>
            <TouchableHighlight   onPress={this.showPicker}>

                          <Image
                            style={{width:50,height:50}}
                            source={require('../assets/calendar.png')}/>

            </TouchableHighlight>
              
      <DateTimePicker
              isVisible={this.state.isVisible}
              onConfirm={this.handlePicker}
              onCancel={this.hidePicker}
              mode={"datetime"}
      ></DateTimePicker>
 <View style={{ paddingVertical: 5 }} />
<Text>Write your number of phone</Text>
<TextInput
          value={this.state.phone_user}
          onChangeText={phone_user => this.setState({ phone_user })}
          placeholder={'+39 327 456 7803 '}
          style={styles.input}
          keyboardType={'numeric'}
        />

 





  <TouchableOpacity
      style={styles.button}
      
      onPress={this.onPressAdd}>
      <Text style={{fontSize:25,color:'white'}}>Confirm the booking</Text>
  </TouchableOpacity>





















<TouchableOpacity style={styles.goback} onPress={()=> this.props.navigation.navigate("App")} >
                     <Text style={{fontSize:25,color:'white'}} >Go back to tutors</Text>
                 </TouchableOpacity>
                 
    </View>

      








          )
  }
}



    
    













const styles=StyleSheet.create({
  container:{
    flex:1,
    //justifyContent:"center",
    alignItems:'center',
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
  alignItems:'center',
  fontSize:20,
  fontWeight:'500',
  color:'white',
  fontWeight:'bold',
  borderBottomWidth:1

},
  button:{
    width:330,
    height:"30%",
    
    top:40,
    backgroundColor:'#05A586',
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center'
  
  },
  text:{
    color:"black",
    fontWeight:"bold",
    alignSelf:"center",
    fontSize:18
  },
 
  goback:{
    width:330,
    height:"30%",
    
    
    backgroundColor:'#034B5C',
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center'
     
  
  
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      backgroundColor: 'white',
      color: 'black',
  },
});

