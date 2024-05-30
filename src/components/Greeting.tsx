import React, { Component } from 'react';
import { Text } from 'react-native';

interface GreetingProps { // defines the props expected by the Greeting component
  name: string;
}
//this component expects props of type GreetingProps
class Greeting extends Component<GreetingProps> {
  render() {
    return (
      <Text>Hello, {this.props.name}!</Text>
    );
  }
}

export default Greeting; //makes the Greeting component available for import in other files.
