import React from 'react';
import { AppRegistry,Text, View, Button, StyleSheet ,TextInput,Linking,Alert,TouchableHighlight,Image, ListView,BackHandler} from 'react-native';
import DateTimePicker, {DateTimePickerModal} from "react-native-modal-datetime-picker"
//import { createAppContainer, createSwitchNavigator } from 'react-navigation';
//import { createStackNavigator } from 'react-navigation-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from "moment"
import RNPickerSelect from "react-native-picker-select"

import firebase from "firebase";


var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;
  
  if (user != null) {
    name = user.displayName;
    email = user.email;
    
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                     // this value to authenticate with your backend server, if
                     // you have one. Use User.getToken() instead.
  }






export default class BeTutorScreen extends React.Component{

  constructor(props){
      super(props)
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      this.inputRefs={}
      this.state={
        
        id:uid,
        descript:'',
        price:'',
        phone:'',
        //mobile_no:'',
        //msg:'',
       //iid:'mBPYavLhGKS2XfQ0YmtbQibWobb2',
        //ChosenSubject:undefined,
      // items:[
      //   {
      //     label:'English',
      //     value:'english',
      //   },
      //   {
      //     label:'Mathematics',
      //     value:'math'
      //   },
      //   {
      //     label:'Physics',
      //     value:'physics'
      //   },
      //   {
      //     label:'Baby-sitting',
      //     value:'baby'
      //   },
      //   {
      //     label:'Hacking',
      //     value:'hacking'
      //   },
      //   ],
      //chosenPlace:undefined,
      // items2:[
      //   {
      //     label:'at home',
      //     value:'home',
      //   },
      //   {
      //     label:'in co-working',
      //     value:'cowork',
      //   },
      //   {
      //     label:'online',
      //     value:'online',
      //   },
      //   {
      //     label:'in tutor place  ',
      //     value:'tutorplace',
      //   }
      //   ],


        // isVisible:false,
        // chosenDate:''
      },

      
      

      this.ref=firebase.firestore().collection('todoTasks').doc(this.state.id)//.collection('reviews').doc('C6UCXO9LZcpV8BAyamLd')




  }

  onPressAdd=()=>{
     if(this.state.descript.trim()===''){
       alert("you add nothing ,please add");
       return
   }
    let setWithOptions = this.ref.set({
      taskName: name,
      price:this.state.price,
      descript:this.state.descript,
      phone:this.state.phone
    }, {merge: true});
    if (this.state.descript.trim()!==''){
      alert("Succes, you've created lesson,go Home and check ")
      return
    }
   
    // this.ref.add({
        
    //    // chosenDate:this.state.chosenDate,
        
    // }).then((data)=>{
    //     console.log('added data=${data}');
    //     this.setState({
    //         //chosenDate:'',
            
    //         loading:true
    //     });

    // }).catch((error)=>{
    //     console.log('erroraas')
    //     this.setState({
    //         chosenDate:'',
            
    //         loading:true
    //     });

    // });
}




handleBackButtonClick() {
  this.props.navigation.goBack(null);
  return true;
}











  





  // handlePicker=(datetime)=>{
  //   this.setState({
  //     isVisible:false,
  //     chosenDate:moment(datetime).format('MMMM,Do YYYY HH:mm')
  //   })
  // }

  // showPicker=()=>{
  //   this.setState({
  //     isVisible:true
  //   })
  // }

  // hidePicker=(datetime)=>{
  //   this.setState({
  //     isVisible:false,
      
  //   })
  // }



  
///////////////////////
 render(){

 //const{navigate}=this.props.navigation;

  return(
    ///////////////////
    
    <View style={styles.container}>
      

      <Text style={styles.headerTitle} >
                 Hi:{name}, please fill all fields in order to be a tutor
      </Text>
       
      

      <View  />

                <Text>Please describe yourself, what you can teach:</Text>
                <TextInput
          value={this.state.descript}
          onChangeText={descript => this.setState({ descript })}
          placeholder={'I am engineer from Politecnico di Milano, \ni am a good teacher, have experince about 5 years'}
          style={pickerSelectStyles.inputIOS}
        />
            {/* <RNPickerSelect
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
            /> */}

         <View style={{ paddingVertical: 5 }} />


                
            {/* <RNPickerSelect
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
            /> */}
            <Text>Choose the price per hour</Text>
        <TextInput
          value={this.state.price}
          onChangeText={price => this.setState({ price })}
          placeholder={'60'}
          style={pickerSelectStyles.inputIOS}
          keyboardType={'numeric'}
        />
         <View style={{ paddingVertical: 5 }} />

         <Text>Write your phone number</Text>
        <TextInput
          value={this.state.phone}
          onChangeText={phone => this.setState({ phone })}
          placeholder={'+39 327 394 23 23'}
          style={pickerSelectStyles.inputIOS}
          keyboardType={'numeric'}/>
            






                





















                      
    
        {/* <Text style={{color:'black', fontSize:12}} >Your date is{this.state.chosenDate}Click icon to choose</Text>
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
      ></DateTimePicker> */}




  {/* <View style={{paddingVertical:20}}>
      <Text>You could ask some additional questions to tutor</Text>
          <TextInput
                    ref={(el) => {
                        this.inputRefs.company = el;
                    }}
                    returnKeyType="go"
                    enablesReturnKeyAutomatically
                    style={pickerSelectStyles.inputIOS}
                    onSubmitEditing={() => {
                        Alert.alert('Success', 'You have booked the lesson', [{ text: 'Okay', onPress: null }]);
                    }}
          /></View> */}






  <TouchableOpacity
      style={{marginTop:30, marginRight:10,backgroundColor:"#05A586"}}
      
      onPress={this.onPressAdd}>
      <Text style={{alignSelf:"center", fontSize:33,color:'white'}}>Confirm the tutoring</Text>
  </TouchableOpacity>

{/* <TextInput
          value={this.state.mobile_no}
          onChangeText={mobile_no => this.setState({ mobile_no })}
          placeholder={'Enter Mobile'}
          style={styles.input}
          keyboardType={'numeric'}
        />
<TextInput
          value={this.state.msg}
          onChangeText={msg => this.setState({ msg })}
          placeholder={'Enter message'}
          style={styles.input}
        />
 <View style={{marginTop:20}}>
          <Button
            onPress={this.sendOnWhatsApp}
            title= 'Send WhatsApp Message'
            />
  </View> */}

















<TouchableOpacity style={styles.goback} onPress={()=> this.props.navigation.navigate("App")} >
                     <Text style={{fontSize:25,color:'white'}} >Go back home </Text>
                 </TouchableOpacity>
    </View>

      




    



          )
  }
}



    
    













const styles=StyleSheet.create({
  container:{
    flex:1,
   //justifyContent:"center",
    //alignItems:'center',
    backgroundColor:'#EFECF4'


  },
  headerTitle:{
    backgroundColor:'#7AD0FF',
    paddingTop:25,
    fontSize:20,
    fontWeight:'bold',
    color:'white',
    fontWeight:'bold',
    borderBottomWidth:1,
    borderColor:"gray"
  },

  button:{
        
        
        
        
    backgroundColor:'#05A586',
    //borderRadius:15,
    justifyContent:'center',
    alignItems:'center'
  
  },
  text:{
    color:"black",
    fontWeight:"bold",
    alignSelf:"center",
    fontSize:18
  },
  row2:{
    
    width:"100%",
    position:"absolute",
    bottom:45,
    justifyContent:"flex-start",
    backgroundColor:'#EFECF4',
    borderWidth:4
},
  instructions:{
    color:'red',
    justifyContent:'flex-end',
    fontSize:30
  },
  goback:{
    backgroundColor:'#034B5C',
    //borderRadius:30,
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

