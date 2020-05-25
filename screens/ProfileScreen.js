import React, { Component } from 'react';
import { Text, View,TouchableOpacity,StyleSheet,TouchableHighlight,Modal,Alert,TextInput } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { Button } from 'native-base';
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

export default class ProfileScreen extends Component {

  




 

  showPolicy(visible) {
    this.setState({modalPolicy: visible});
  }
showCompany(visible){
  this.setState({modalCompany:visible})
}

constructor(props){
  super(props);
  this.state={
    newPassword:'',
    newEmail: "",
    currentPassword: "",

      modalPolicy: false,
      modalCompany:false,
    
  }
}


// Reauthenticates the current user and returns a promise...
reauthenticate = (currentPassword) => {
  var user = firebase.auth().currentUser;
  var cred = firebase.auth().EmailAuthProvider.credential(user.email, currentPassword);
  return user.reauthenticateWithCredential(cred);
}


// Changes user's password...
onChangePasswordPress = () => {
  this.reauthenticate(this.state.currentPassword).then(() => {
    var user = firebase.auth().currentUser;
    user.updatePassword(this.state.newPassword).then(() => {
      Alert.alert("Password was changed");
    }).catch((error) => { console.log(error.message); });
  }).catch((error) => { console.log(error.message) });
}

// Changes user's email...
onChangeEmailPress = () => {
  this.reauthenticate(this.state.currentPassword).then(() => {
    var user = firebase.auth().currentUser;
    user.updateEmail(this.state.newEmail).then(() => {
      Alert.alert("Email was changed");
    }).catch((error) => { console.log(error.message); });
  }).catch((error) => { console.log(error.message) });
}




  render() {
    return (
    <View style={styles.container}>
            <View style={styles.header}>
                  <Text style={styles.headerTitle}>Helllo: {name}</Text>
            </View>





            


      <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalPolicy}
         >
            <View style={{marginTop: 22,backgroundColor:"silver" }}> 
                <View>
                    <Text  >[Developer/Company name] built the [App Name] app as [open source/free/freemium/ad-supported/commercial] app. This SERVICE is provided by [Developer/Company name] [at no cost] and is intended for use as is.

This page is used to inform visitors regarding [my/our] policies with the collection, use, and disclosure of Personal Information if anyone decided to use [my/our] Service.

If you choose to use [my/our] Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that [I/We] collect is used for providing and improving the Service. [I/We] will not use or share your information with anyone except as described in this Privacy Policy.

The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at [App Name] unless otherwise defined in this Privacy Policy.</Text>

                  <TouchableHighlight
                        onPress={() => {
                        this.showPolicy(!this.state.modalPolicy);
                         }}>
                        <Text style={{justifyContent:"flex-end",fontSize:20,fontWeight:"bold"}}>Close </Text>
                  </TouchableHighlight>
                </View>
            </View>
      </Modal>

          <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalCompany}
                >
              <View  style={{marginTop: 22,backgroundColor:"silver" }}>
                  <View>
                      <Text>Круглосуточная служба поддержки клиентов и приём заказов:
                          телефон: +7 (495) 777-54-44

                          \n Если Вы B2B-клиент:
                          телефон: +7 (495) 745-56-16

                          e-mail: b2b@utkonos.ru

                          Если Вас интересует трудоустройство в Утконосе:
                          Вакансии (склад и транспорт): +7 (495) 009-51-61 (доб. 7930, 7936, 1370, 1315)

                          Вакансии Центральный офис: +7 (495) 009-51-61 (доб. 7192)

                          моб. телефон: +7 (925) 809-80-00

                            e-mail: resume@utkonos.ru</Text>

                        <TouchableHighlight
                            onPress={() => {
                            this.showCompany(!this.state.modalCompany);
                            }
                            }>
                            <Text style={{justifyContent:"flex-end",fontSize:20,fontWeight:"bold"}}>Close </Text>
                        </TouchableHighlight>
                  </View>
               </View>
           </Modal>




        

         
        



      




        
         <View style={styles.greeting}>
         <Ionicons name="ios-person" size={40} color={"gray"}/>
                <Text>your email is:{email}</Text>
                <Text>your name is:{name}</Text>

          </View>
        <Text style={{paddingTop:20,borderTopWidth:2}}>Type here a new Email to change</Text>
        <TextInput style={styles.textInput} value={this.state.newEmail}
          placeholder="New Email" autoCapitalize="none" keyboardType="email-address"
          onChangeText={(text) => { this.setState({newEmail: text}) }}
        />

        <Button style={{backgroundColor:'silver'}} onPress={this.onChangeEmailPress} ><Text>Change the email</Text></Button>



          <Button style={styles.row2} onPress={() => { this.showCompany(true);}}>
            
            <Text>company contacts</Text>
      </Button>
      <Text style={{paddingTop:30,borderTopWidth:2}} >Type here your password to change</Text>
      <TextInput style={styles.textInput} value={this.state.currentPassword}
          placeholder="Current Password" autoCapitalize="none" secureTextEntry={true}
          onChangeText={(text) => { this.setState({currentPassword: text}) }}
        />

        <TextInput style={styles.textInput} value={this.state.newPassword}
          placeholder="New Password" autoCapitalize="none" secureTextEntry={true}
          onChangeText={(text) => { this.setState({newPassword: text}) }}
        />

        <Button  style={{backgroundColor:'silver'}} onPress={this.onChangePasswordPress}><Text>Change the password</Text></Button>

      

      <Button style={styles.row1} onPress={() => { this.showPolicy(true);}}>
            
            <Text>Legacy ,policy of application</Text>
      </Button>
     
      
      <Button style={styles.row} onPress={()=>{ 
    firebase.auth().signOut();
  }} ><Ionicons name="ios-log-out" size={30} color={"black"}/><Text style={{fontSize:20}}>Logout from application</Text></Button>  
         

</View>
    );
  }
}









const styles =StyleSheet.create({
  container:{
    flex:1,
   
    backgroundColor:'#EFECF4'
},
  row:{
    
      width:"100%",
      position:"absolute",
      bottom:0,
      justifyContent:"flex-start",
      backgroundColor:'#EFECF4',
      borderWidth:1
  },

  row1:{
    width:"100%",
    position:"absolute",
    bottom:45,
    justifyContent:"flex-start",
    backgroundColor:'#EFECF4',
    borderWidth:1
},

row3:{
  width:"100%",
  //position:"absolute",
  //bottom:300,
  justifyContent:"flex-start",
  backgroundColor:'#EFECF4',
  borderWidth:1
},
greeting:{
  paddingTop:10,
  backgroundColor:"#86B9FE",
alignItems:'center'
},

row2:{
  width:"100%",
  position:"absolute",
  bottom:90,
  justifyContent:"flex-start",
  backgroundColor:'#EFECF4',
  borderWidth:1
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
})