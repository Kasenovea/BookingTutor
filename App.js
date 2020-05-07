import React from 'react';

import { View, Text, Button } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Ionicons} from '@expo/vector-icons';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';
import TutorScreen from './screens/TutorScreen'

import ChooseScreen from './screens/ChooseScreen';


import   firebase from 'firebase'
import BeTutorScreen from './screens/BeTutorScreen';
import ConfirmTutor from './screens/ConfirmTutor';
import BookedTutorScreen from './screens/BookedTutorScreen'
import ReviewScreen from './screens/ReviewScreen'
import RegisterTutor from './screens/RegisterTutor';
import Fire from "./Fire"

    

//firebase.initializeApp(environment.firebase);

  

  


// const AppStack=createStackNavigator({
//     Home:HomeScreen
// })

const AppTabNavigator=createBottomTabNavigator(
    {
        Home:{
            screen:HomeScreen,
            navigationOptions:{
                tabBarIcon:({tintColor})=><Ionicons name="ios-home" size={24} color={tintColor}/>
            }
        },
        forTutor:{
            screen:TutorScreen,
            navigationOptions:{
                tabBarIcon:({tintColor})=><Ionicons name="ios-search" size={24} color={tintColor}/>
            }
        },

        Book:{
            screen:BookingScreen,
            navigationOptions:{
                tabBarIcon:({tintColor})=><Ionicons name="ios-calendar" size={24} color={tintColor}/>
            }
        },
        Profile:{
            screen:ProfileScreen,
            navigationOptions:{
                tabBarIcon:({tintColor})=><Ionicons name="ios-person" size={24} color={tintColor}/>
            }
        },



    }
)
//here if we put the screen,//here if we put screen and define it ,
// on the screen will appear goBack option with current name of page 
const AuthStack=createStackNavigator({
    Choose:ChooseScreen,
    //BeTutor:BeTutorScreen,
    Login:LoginScreen,
    
    RegisterTutor:RegisterTutor,
   
    Register:RegisterScreen,
    
    ConfirmTutor:ConfirmTutor,
    //BookedTutorScreen:BookedTutorScreen
  // ReviewScreen:ReviewScreen 
   
})
//here if we put screen and define it , on the screen will appear just clear screen  of page 
export default createAppContainer(
    createSwitchNavigator(
        {
            Loading:LoadingScreen,
            Tutor:TutorScreen,
            App:AppTabNavigator,
            Auth:AuthStack,
            BeTutor:BeTutorScreen,
            ConfirmTutor:ConfirmTutor,
            Home:HomeScreen,
            ReviewScreen:ReviewScreen,
            Profile:ProfileScreen,
            BookedTutorScreen:BookedTutorScreen,
            BookingScreen:BookingScreen
        },
        {
            initialRouteName:'Loading'
        }
    )
);
  