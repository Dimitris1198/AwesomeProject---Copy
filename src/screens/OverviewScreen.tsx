// src/screens/OverviewScreen.tsx

import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Item {
  text: string;
  timestamp: string;
}

interface OverviewScreenState {
  items: Item[];
}

export default class OverviewScreen extends Component<any, OverviewScreenState> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.loadItems();
    this.props.navigation.addListener('focus', this.loadItems);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.loadItems);
  }

  loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('items');
      if (storedItems !== null) {
        this.setState({ items: JSON.parse(storedItems) });
      }
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  render() {
    return (
      <ImageBackground source={require('./mono.png')} style={styles.background}>
        <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.card, styles.shadowProp]}>
          <Text style={styles.heading}>To-Do List</Text>
          </View>
         
          {this.state.items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.item}>{item.text}</Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          ))}
          <View style={styles.buttonContainer}>
            <Button
              title="Add Item"
              onPress={() => this.props.navigation.navigate('Create')}
            />
            <Button
              title="Delete Items"
              onPress={() => this.props.navigation.navigate('Delete')}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  card: {

    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
   
    marginVertical: 10,
  },
  item: {
    color: 'red',
    fontSize: 30,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  heading: {
    fontSize: 40,
    shadowColor: 'gray',
    
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'cyan',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    width: windowWidth * 0.9,
  },
  timestamp: {
    marginLeft: 10,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});
