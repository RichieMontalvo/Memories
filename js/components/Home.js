import React, { Component } from 'react';
import { View,Button, Text, ImageBackground, TouchableOpacity } from 'react-native';
const image = { uri:"https://photographymatterspodcast.com/wp-content/uploads/2019/02/memories-matter-1024x684.jpg"};



export default function Home({ navigation }) {
  
    return (
    <ImageBackground source={image} style={{height:'100%'}}> 
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <Text style={{ color:'white', margin:10, fontSize:'60px', fontWeight:800, textShadow:'7px 7px 13px black'}}>MEMORIES</Text>
        <Text style={{color:'lightgray', marginBottom:10, fontWeight:300, backgroundColor:'black', height:40, padding:"10px", borderRadius:3}}>Collect Moments Not Things</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MyJournal')}> 
         <Text style = {{backgroundColor:'gray', fontWeight:500, fontSize:'20px', padding:'10px', height:50, color:'white', textShadow:'2px 1px 9px darkgray',
                         border:'1px solid white',borderRadius:3, boxShadow:'inset -2px 2px 7px lightgray, inset 2px -2px 7px white, inset 2px -2px 2px rgba(0, 255, 255, 0.83)', marginTop:50}}>
                OPEN JOURNAL
         </Text>
        </TouchableOpacity >
        
      
         </View>
    </ImageBackground> 
     
    );
  }


 