// src/screens/DeleteScreen.tsx

import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Item {
  text: string;
  timestamp: string;
}

export default class DeleteScreen extends Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.loadItems();
  }

  loadItems = async () => {
    try {
      const items = await AsyncStorage.getItem('items');
      if (items !== null) {
        this.setState({ items: JSON.parse(items) });
      }
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  deleteItem = async (index: number) => {
    try {
      const { items } = this.state;
      items.splice(index, 1);
      await AsyncStorage.setItem('items', JSON.stringify(items));
      this.loadItems(); // Reload items after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  clearItems = async () => {
    try {
        
      await AsyncStorage.removeItem('items');
      this.loadItems(); // Reload items after deletion
     
    } catch (error) {
      console.error('Error clearing items:', error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>To-Do List</Text>
        {this.state.items.map((item: Item, index: number) => (
          <View key={index} style={styles.itemContainer}>
            <Text>{item.text}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
            <Button title="Delete" onPress={() => this.deleteItem(index)} />
          </View>
        ))}
        <Button title="Delete All" onPress={this.clearItems} />
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  timestamp: {
    marginLeft: 10,
    color: 'gray',
  },
});
