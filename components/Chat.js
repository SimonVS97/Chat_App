import React from 'react';
import { View, Text, Button } from 'react-native';



export default class Chat extends React.Component {

  componentDidMount() {
    // extract prop name and set title to name
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
  }

  render() {

    // extract prop color into color variable
    const color = this.props.route.params.color;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color }}>
        <Button
          title="Go to Start"
          onPress={() => this.props.navigation.navigate('Start')}>
        </Button>
      </View>
    )
  }
}