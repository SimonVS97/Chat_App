import React from 'react';
import { useCallback } from 'react';
import { StyleSheet, View, Text, Button, TouchableHighlightBase, Platform, KeyboardAvoidingView, Image } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { color } from 'react-native-reanimated';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import CustomActions from './CustomActions';

import MapView from 'react-native-maps';

const firebase = require('firebase');
require('firebase/firestore');


export default class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.route.params.name,
      messages: [],
      uid: '',
      isConnected: true,
      image: null,
    }
    if (!firebase.apps.length) {
      firebase.initializeApp({
        // insert your Firestore dabase credentials here!
        apiKey: "AIzaSyA3KdIR0s_9fs41q9jo9bkSvIEYzkTBi4A",
        authDomain: "test-a2d10.firebaseapp.com",
        projectId: "test-a2d10",
        storageBucket: "test-a2d10.appspot.com",
        messagingSenderId: "686097625275",
        appId: "1:686097625275:web:7975b7132b405288b8b99e",
        measurementId: "G-W00FVGPRYS"
      });
    }
  }



  // take a photo with the device
  takePhoto = async () => {
    let { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL,
    );
    if (status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images',
      }).catch(error => console.log(error));
      if (!result.cancelled) {
        this.setState({
          image: result
        })
      }
    }
  }

  // get messages from async storage
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      })
    } catch (error) {
      console.log(error.message);
    }
  };

  // stringify the state of messages and put it into asyncstorage
  async saveMessages() {
    try {
      console.log(this.state.messages[0])
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }
  // method to remove messages if needed
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    // extract prop name and set title to name
    let name = this.state.name;
    this.props.navigation.setOptions({ title: name });

    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        console.log('online');
        this.setState({
          isConnected: true,
        })
        // online
        // auth user
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }
          // update user state with currently active user data
          this.setState({
            uid: user.uid,
            messages: [],
          });
        })
        // get data from the collection
        this.referenceChatMessages = firebase.firestore().collection('messages');
        this.unsubscribe = this.referenceChatMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);

      } else {
        console.log('offline');
        // offline
        // set state messages to messages in async storage
        this.getMessages();
        this.setState({
          isConnected: false,
        })
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go thru each doc in collection
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        createdAt: data.createdAt.toDate(),
        text: data.text,
        uid: data.uid,
        user: {
          _id: data.user._id
        },
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages
    });
    this.saveMessages()
  }

  // save user messages
  addList() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: {
        _id: message.user._id,
      },
      image: message.image || null,
      location: message.location || null,
    });
  }

  onSend(messages = []) {
    this.setState(
      // previousState is the state of the state before the change is applied
      // we pass messages into the onSend function and append messages to the previousState to build the new state of messages
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addList();
        this.saveMessages();
      });
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar
          {...props}
        />
      );
    }
  }

  renderCustomActions = (props) => {
    return <CustomActions {...props} />
  }

  renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  render() {

    // extract prop color into color variable
    const color = this.props.route.params.color;
    return (
      <View style={styles.container}>
        {this.state.image &&
          <Image source={{ uri: this.state.image.uri }} style={{ width: 200, height: 200 }} />}
        <GiftedChat
          // feed messages into Gifted chat component
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          listViewProps={{
            style: {
              backgroundColor: color,
            },
          }}
          user={{
            _id: this.state.uid,
            avatar: "https://placeimg.com/140/140/people",
          }} />
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/*
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color }}>
        <Button
          title="Go to Start"
          onPress={() => this.props.navigation.navigate('Start')}>
        </Button>
      </View>
*/