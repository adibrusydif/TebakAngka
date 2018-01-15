/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native'

import { connect } from 'react-redux'
import { fetchData } from './actions'

const correct_img =require('./img/icons8-ok-48.png')
const wrong_img=require('./img/icons8-cancel-48.png')

class Setup extends Component {
  state ={
    randomNumb:null,
    inputNumb:null,
    result:"",
    score: 0
  }
  componentDidMount(){
    this.props.dispatch(fetchData())
    this.generatedRandomNumb()
  }
  generatedRandomNumb(){
    const numb = Math.floor((Math.random() * 10) + 1)
    this.setState({
      randomNumb:numb
    })
  }
  clickHandler(){
    if(this.state.randomNumb == this.state.inputNumb){
      this.setState({ result : 'correct', score: this.state.score + 10})
    } else{
      this.setState({ result : 'wrong'})
    }
    this.generatedRandomNumb()
    this.setState({ inputNumb: ''})
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput 
        value={this.state.inputNumb}
        onChangeText={(text)=>this.setState({inputNumb: text})}
        style={{ fontSize: 45, fontWeight:'bold'}} />

        <TouchableOpacity 
          onPress={()=>this.clickHandler()}
          style={{ backgroundColor:'green'}}>
          <Text style={{ color:'white', margin: 15, fontSize:16 }}> Submit</Text>
        </TouchableOpacity>
        { this.state.result == 'correct' && 
          <Image style={{ width:100, height:100, resizeMode:'contain'}} source={correct_img} />
        }
        { this.state.result == 'wrong' && 
          <Image style={{ width:100, height:100, resizeMode:'contain'}} source={wrong_img} />
        }
        <Text>{this.state.randomNumb}</Text>
        <Text style={{ fontSize: 15, marginTop: 20}}>Score :{this.state.score}</Text>
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  console.log(state)
  return {
    data: state.data.items
  }
}

export default connect(mapStateToProps)(Setup)