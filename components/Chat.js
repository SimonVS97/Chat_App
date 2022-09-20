import React from 'react';
import { useCallback } from 'react';
import { StyleSheet, View, Text, Button, TouchableHighlightBase, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';



export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    // extract prop name and set title to name
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    // static message
    this.setState({
      messages: [
        {
          _id: 1,
          text: name + ' Has entered the chat',
          createdAt: new Date(),
          system: true,
          // Any additional custom parameters are passed through
        },
        {
          _id: 2,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any'
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(
      // previousState is the state of the state before the change is applied
      // we pass messages into the onSend function and append messages to the previousState to build the new state
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))
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
          user={{
            _id: 1,
          }} />
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
      </View>
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