import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';

const height = Dimensions.get('window').height;

class PostDetail extends React.Component {
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
          <Text style={styles.text}>Post Detail</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#5ff575',
  },
});

export default PostDetail;
