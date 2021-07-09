import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';

const height = Dimensions.get('window').height;

export class Profile extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f7c1f2',
          }}>
          <Text style={styles.text}>Profile</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#519872',
  },
});
