// src/screens/CreateScreen.tsx

import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CreateScreenState {
  newItem: string;
}

export default class CreateScreen extends Component<any, CreateScreenState> {
  constructor(props: any) {
    super(props);
    this.state = {
      newItem: '',
    };
  }

  saveItem = async () => {
    try {
      const { newItem } = this.state;
      if (newItem) {
        const timestamp = new Date().toISOString(); // Get current timestamp
        const itemWithTimestamp = { text: newItem, timestamp }; // Create item with timestamp
        const existingItems = (await AsyncStorage.getItem('items')) || '[]';
        const items = JSON.parse(existingItems);
        items.push(itemWithTimestamp);
        await AsyncStorage.setItem('items', JSON.stringify(items));
        this.props.navigation.goBack();
      }
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ newItem: text })}
          placeholder="Enter new item"
        />
        <Button title="Save" onPress={this.saveItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'purple',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 40,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '80%',
  },
});
