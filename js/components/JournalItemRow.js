import React from 'react';
import {Image, StyleSheet, Text, View,Dimensions, PanResponder } from 'react-native';
import TouchableItem from './TouchableItem';
import {SimpleLineIcons} from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

const WINDOW_WIDTH = Dimensions.get('window').width;


export default class JournalItemRow extends React.Component {
    state = {
        animSwipe: new Animated.Value(0),
        animHeight: new Animated.Value(70)
      };

    _cancelSwiping(){
        Animated.spring(this.state.animSwipe, {toValue:0}).start();
    }

    componentWillMount(){
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                this.setState({ backgroundColor:'yellow'});
            },
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dx < 5) {
                  this.state.animSwipe.setValue(gestureState.dx);
                }
              },
              onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx < -(WINDOW_WIDTH / 3)) {
                    Animated.spring(this.state.animSwipe, {
                      toValue: -WINDOW_WIDTH,
                      speed: 100
                    }).start(() => this.props.deleteItem());
                  } else {
                    this._cancelSwiping();
                  }
                },
                onPanResponderTerminate: (evt, gestureState) => {
                  this._cancelSwiping();
                }
              });
            }

    render(){
        const { item } = this.props
        const date = new Date(item.date)
    
        const minutes = (date.getMinutes()<10 ? '0': '') + date.getMinutes();
        const time = `${date.getHours()}:${minutes}`;
        const photo = item.photo ? (
            <Image style={styles.image} source={{uri: item.photo}} />
        ) : null;

        
        
        return(
            <Animated.View {...this._panResponder.panHandlers} style={[{height: this.state.animHeight},styles.panContainer]}>
            <TouchableItem onPress={this.props.onPress} style={styles.touchableRow}>
                <Animated.View style={[{transform:[{translateX:this.state.animSwipe}]}, styles.containerwrapper]}>
                    {photo}
                    
                    <View style={styles.itemText}>
                        <Text numberOfLines={10} style={styles.journalText}>{item.text.charAt(0).toUpperCase()+item.text.slice(1)}</Text>
                        <Text style={styles.time}>{time}</Text>
                    </View>
                </Animated.View>
            </TouchableItem>
            </Animated.View>
        )
    }
}



const styles = StyleSheet.create({
    panContainer: {
        flexDirection:'row',
        height:'auto',
        boxShadow:'1px 1px 3px gray',
        
    },
    touchableRow:{
        flex:1
    },
    delete:{
        justifyContent:'center',
        backgroundColor:'orangered',
        width: WINDOW_WIDTH,
        marginRight: -WINDOW_WIDTH
    },
    
    time:{
        color:'gray',
        fontSize: 11,
        fontWeight: '100',
        alignSelf: 'flex-end'
    },
    image:{
        width:70,
        height:70,
        marginRight: 5,
        borderColor: 'aqua',
        borderRadius: 2,
        borderWidth: 1,
    },
    containerwrapper:{
        flex:1,
        flexDirection:'row',
        paddingHorizontal: 5,
        paddingVertical: 3,
        backgroundColor: '#222222',
        color:'white', margin:10
        },
       
    itemText:{
        flex:1,
        justifyContent:'space-between',
        
    },
    journalText:{
        color:'white',
        overflow:'scroll',
        textAlign:'justify'
    }
  });