/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { hasLocationPermission } from '../services/LocationPermission';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ASPECT_RATIO = width / height;
const LATITUDE = -33.3018708;
const LONGITUDE = -66.3298548;
const LATITUDE_DELTA = 0.00422;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class CenterMap extends Component {
  constructor(props) {
    super(props);
    const { coordenades } = this.props.route.params.item;
    this.state = {
      region: {
        latitude: coordenades.lat || LATITUDE,
        longitude: coordenades.lon || LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      mapType: 'standard',
    };
  }
  onRegionChange = region => {
    this.setState({ region });
  };
  componentDidMount = async () => {
    await hasLocationPermission();
    this._getLocation();
  };
  _getLocation = async () => {
    await Geolocation.getCurrentPosition(
      async posicion => {
        const longitude = posicion.coords.longitude;
        const latitude = posicion.coords.latitude;
        this.mapRef.animateToRegion(
          {
            latitude,
            longitude,
            latitudeDelta: this.state.region.latitudeDelta,
            longitudeDelta: this.state.region.longitudeDelta,
          },
          1000,
        );
        console.log(
          'posicion actual... Latitud: ' +
            `${JSON.stringify(longitude)}` +
            ' latitud: ' +
            `${JSON.stringify(latitude)}`,
        );
      },
      error => {
        console.log(error.code, error.message);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
      },
    );
  };
  _changeMap = () => {
    const mapType = this.state.mapType === 'standard' ? 'hybrid' : 'standard';
    this.setState({ mapType: mapType });
  };
  async fitCoordinates() {
    console.log('centrando mapa');
    this._getLocation();
  }
  render() {
    const { name, adress, coordenades } = this.props.route.params.item;
    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={map => {
            this.mapRef = map;
          }}
          mapType={this.state.mapType}
          style={styles.map}
          initialRegion={this.state.region}
          // region={this.state.region}
          onRegionChangeComplete={this.onRegionChange}>
          <Marker
            coordinate={{
              latitude: coordenades.lat || LATITUDE,
              longitude: coordenades.lon || LONGITUDE,
            }}
            title={name}
            description={adress}
          />
        </MapView>
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            backgroundColor: 'white',
            borderRadius: 100,
            width: width / 10,
            alignSelf: 'flex-start',
            margin: 20,
            marginRight: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            name="layer-group"
            type="font-awesome-5"
            color="#8d2d84"
            size={width / 12}
            onPress={() => this._changeMap()}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            backgroundColor: 'white',
            borderRadius: 100,
            width: width / 10,
            alignSelf: 'flex-end',
            margin: 20,
            marginRight: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            name="crosshairs"
            type="font-awesome"
            color="#8d2d84"
            size={width / 10}
            onPress={() => this.fitCoordinates()}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    margin: width / 20,
    height: width / 2.5,
    width: width / 2.5,
    borderRadius: 15,
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
    alignSelf: 'center',
  },
  marker: {
    height: 48,
    width: 48,
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20,
    alignSelf: 'center',
  },
});

export default CenterMap;
