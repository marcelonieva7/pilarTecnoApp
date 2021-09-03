/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  View,
  ImageBackground,
} from 'react-native';
import { Button, Divider, Image } from 'react-native-elements';
import { actions } from '../Store/actions';
import { connect } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class Centers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centers: null,
    };
  }
  componentDidMount = () => {
    this.props.getCenters();
  };
  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => this.props.navigation.navigate('CenterDetail', { item })}>
      <View
        style={{
          margin: 20,
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: 8,
          padding: 5,
        }}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <Divider />
        <View style={styles.bodycontainer}>
          <Image
            source={{ uri: item?.img }}
            style={{ width: 200, height: 200 }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        {!this.props.centers ? (
          <ActivityIndicator />
        ) : (
          <ImageBackground
            style={{ height, width, paddingTop: height / 9 }}
            source={require('../assets/images/fondo1.jpg')}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Button
                title="Crear Nuevo Centro"
                onPress={() => this.props.navigation.navigate('CenterCreate')}
                buttonStyle={{ marginBottom: 12 }}
              />
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.props.centers}
                renderItem={this.renderItem}
                style={{ marginBottom: 18 }}
              />
            </View>
          </ImageBackground>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  titlecontainer: {
    padding: 10,
  },
  bodycontainer: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    margin: width / 20,
    height: width / 2.5,
    width: width / 2.5,
    borderRadius: 15,
    justifyContent: 'center',
  },
});
const mapDispatchToProps = dispatch => ({
  getCenters: () => dispatch(actions.centers.getCenters()),
});
const mapStateToProps = state => ({
  centers: state.centers.centers,
});
export default connect(mapStateToProps, mapDispatchToProps)(Centers);
