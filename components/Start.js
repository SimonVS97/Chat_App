import React from "react";
import { StyleSheet, View, Text, Button, ImageBackground, TouchableOpacity, Pressable } from 'react-native';
import { TextInput } from "react-native-gesture-handler";

const backgroundImage = require("../assets/Background-Image.png");

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      color: "",
    };
  }


  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.backgroundImage} source={require('../assets/Background-Image.png')} >
          <Text style={styles.AppTitle}>Chatify</Text>

          <View style={styles.card}>
            <TextInput
              style={styles.input}
              value={this.state.name}
              onChangeText={(name) => this.setState({ name: name })}
              placeholder="Your name"
            >
            </TextInput>

            <Text style={styles.chooseTitle}>Choose Background Color:</Text>
            <View style={styles.containerColors}>
              <TouchableOpacity style={styles.first}
                onPress={() => { this.setState({ color: '#090C08' }) }}
              ></TouchableOpacity>
              <TouchableOpacity style={styles.second}
                onPress={() => { this.setState({ color: '#474056' }) }}
              ></TouchableOpacity>
              <TouchableOpacity style={styles.third}
                onPress={() => { this.setState({ color: '#8A95A5' }) }}
              ></TouchableOpacity>
              <TouchableOpacity style={styles.fourth}
                onPress={() => { this.setState({ color: '#B9C6AE' }) }}
              ></TouchableOpacity>
            </View>


            <Pressable
              style={styles.chatButton}
              onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}
            >
              <Text style={styles.chatButtonText}>Start Chatting</Text>
            </Pressable>
          </View>
        </ImageBackground >

      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  AppTitle: {
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    width: '88%',
    alignItems: 'center',
    height: '44%',
    justifyContent: 'space-evenly',
  },
  input: {
    height: 50,
    width: '88%',
    borderColor: 'gray',
    borderWidth: 2,
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
    opacity: '50%'
  },
  chooseTitle: {
    color: '#757083',
    fontSize: 16,
    fontWeight: '300'
  },
  chatButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#757083',
    width: '88%'
  },
  chatButtonText: {
    padding: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF'
  },
  containerColors: {
    flexDirection: 'row',
    width: '88%',
    justifyContent: 'space-around'

  },
  first: {
    backgroundColor: '#090C08',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    opacity: '100%',
  },
  second: {
    backgroundColor: '#474056',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    opacity: '100%',
  },
  third: {
    backgroundColor: '#8A95A5',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    opacity: '100%',
  },
  fourth: {
    backgroundColor: '#B9C6AE',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    opacity: '100%',
  }
});

