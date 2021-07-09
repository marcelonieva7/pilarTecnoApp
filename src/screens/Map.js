import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';

const height = Dimensions.get('window').height;

export class Map extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#c1f6f7',
          }}>
          <Text style={styles.text}>Map</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#5ff5757',
  },
});
