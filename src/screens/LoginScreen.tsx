// src/screens/LoginScreen.tsx

import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';

interface LoginScreenProps {
  navigation: any;
}

interface LoginScreenState {
  username: string;
  password: string;
}

class LoginScreen extends Component<LoginScreenProps, LoginScreenState> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleUsernameChange = (username: string) => {
    this.setState({
      username: username,
    });
  };

  handlePasswordChange = (password: string) => {
    this.setState({
      password: password,
    });
  };

  onLogin = async (): Promise<any> => {
    if (this.state.username === '' || this.state.password === '') {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    console.log('Username:', this.state.username);
    console.log('Password:', this.state.password);

    this.props.navigation.navigate('OverviewScreen');
  };

  render() {
    return (
      <ImageBackground source={require('./mono.png')} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={this.state.username}
            onChangeText={this.handleUsernameChange}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            secureTextEntry
          />
          <Button title="Login" onPress={this.onLogin} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: 'white',
  },
});

export default LoginScreen;
