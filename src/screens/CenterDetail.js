/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { actions } from '../Store/actions';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class CenterDetail extends Component {
  constructor(props) {
    super(props);
  }
  _del = () => {
    const { _id } = this.props.route.params.item;
    Alert.alert('Alerta', 'Borrar centro?', [
      {
        text: 'Borrar',
        onPress: () => {
          this.props
            .deleteCenter({ _id })
            .then(() => {
              this.props.navigation.goBack();
            })
            .then(() => Alert.alert('Alerta', 'Centro Borrado'))
            .catch(err => Alert.alert('Error', `${err}`));
        },
      },
      {
        text: 'Cancelar',
        onPress: () => {},
      },
    ]);
  };
  _edit = () => {
    const { item } = this.props.route.params;
    this.props.navigation.navigate('CenterEdit', { item });
  };
  render() {
    const { name, adress, img } = this.props.route.params.item;
    const { item } = this.props.route.params;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ImageBackground
          style={[styles.content, { height, width }]}
          source={require('../assets/images/fondo1.jpg')}>
          <Card
            containerStyle={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: 8,
            }}>
            <Card.Title style={{ color: '#ffffff' }}>{name}</Card.Title>
            <Card.Divider />
            <Card.Image source={{ uri: img }} />
            <Card.Divider />
            <Text style={{ marginBottom: 10, color: '#ffffff' }}>{adress}</Text>
            <Button
              icon={
                <Icon
                  name="map-marker"
                  type="font-awesome-5"
                  size={18}
                  color="#ffffff"
                  style={{ marginRight: 4 }}
                />
              }
              buttonStyle={{
                borderRadius: 5,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                backgroundColor: 'green',
              }}
              title="Ver Mapa"
              onPress={() =>
                this.props.navigation.navigate('CenterMap', { item })
              }
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingVertical: 8,
              }}>
              <Button
                icon={
                  <Icon
                    name="edit"
                    type="font-awesome-5"
                    size={18}
                    color="#ffffff"
                    style={{ marginRight: 4 }}
                  />
                }
                buttonStyle={{
                  borderRadius: 5,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                }}
                title="Editar"
                onPress={() => this._edit()}
              />
              <Button
                icon={
                  <Icon
                    name="trash-alt"
                    type="font-awesome-5"
                    size={18}
                    color="#ffffff"
                    style={{ marginRight: 4 }}
                  />
                }
                buttonStyle={{
                  borderRadius: 5,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  backgroundColor: 'red',
                }}
                title="Borrar"
                onPress={() => this._del()}
              />
            </View>
          </Card>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    // color:'#fff',
    textAlign: 'center',
  },
  content: {
    margin: width / 10,
    height: width / 2.5,
    width: width / 2.5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapDispatchToProps = dispatch => ({
  deleteCenter: data => dispatch(actions.centers.delcenter(data)),
});

const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CenterDetail);
