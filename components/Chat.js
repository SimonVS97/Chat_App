import React from 'react';
import { useCallback } from 'react';
import { StyleSheet, View, Text, Button, TouchableHighlightBase, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { color } from 'react-native-reanimated';
const firebase = require('firebase');
require('firebase/firestore');


export default class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.route.params.name,
      messages: [],
      uid: '',
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

  componentDidMount() {
    // extract prop name and set title to name
    let name = this.state.name;
    this.props.navigation.setOptions({ title: name });

    // get data from the collection
    this.referenceChatMessages = firebase.firestore().collection('messages');
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
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
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
        createdAt: data.createdAt,
        text: data.text,
        user: data.user
      });
    });
    this.setState({
      messages
    });
  }

  // save user messages
  addList(message) {
    this.referenceChatMessages.add({
      message
    });
  }

  onSend(messages = []) {
    this.setState(
      // previousState is the state of the state before the change is applied
      // we pass messages into the onSend function and append messages to the previousState to build the new state
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));
    this.addList(messages);
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

  render() {

    // extract prop color into color variable
    const color = this.props.route.params.color;
    return (
      <View style={styles.container}>
        <GiftedChat
          // feed messages into Gifted chat component
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderBubble={this.renderBubble.bind(this)}
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