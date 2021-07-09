import React, { Component } from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class Posts extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'column',
            height,
            justifyContent: 'center',
          }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('PostEdit')}
              style={[
                styles.button,
                { backgroundColor: 'rgba(60, 179, 113, 0.5)' },
              ]}>
              <Text style={styles.text}>Post Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('PostCreate')}
              style={[
                styles.button,
                { backgroundColor: 'rgba(238, 0, 238, 0.5)' },
              ]}>
              <Text style={styles.text}>Post Create</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('PostDetail')}
              style={[
                styles.button,
                { backgroundColor: 'rgba(255, 165, 0, 0.5)' },
              ]}>
              <Text style={styles.text}>Post Detail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    margin: width / 20,
    height: width / 2.5,
    width: width / 2.5,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: '#fff',
    zIndex: 1,
  },
});

export default Posts;
