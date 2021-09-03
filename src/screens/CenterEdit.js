/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Text,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { actions } from '../Store/actions';
import { Alert } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const CenterEdit = props => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const {
    _id,
    adress,
    name,
    img,
    coordenades: { lat, lon },
  } = props.route.params.item;

  // eslint-disable-next-line no-shadow
  const onSubmit = ({ name, adress, img, lat, lon }) => {
    const body = {
      name,
      adress,
      img,
      coordenades: {
        lat: Number(lat),
        lon: Number(lon),
      },
    };
    Alert.alert('Alerta', 'Guardar cambios?', [
      {
        text: 'Guardar',
        onPress: () => {
          props
            .updateCenter({ body, _id })
            .then(() => {
              props.navigation.navigate('Centers');
            })
            .then(() => Alert.alert('Alerta', 'Centro Editado'))
            .catch(err => Alert.alert('Error', `${err}`));
        },
      },
      {
        text: 'Cancelar',
        onPress: () => {},
      },
    ]);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView>
        <ImageBackground
          style={[styles.content, { height, width }]}
          source={require('../assets/images/fondo1.jpg')}>
          {errors.name && (
            <Text style={styles.error}>{errors.name.message}</Text>
          )}
          <Controller
            control={control}
            name="name"
            defaultValue={name}
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                placeholder="Nombre del centro"
                inputContainerStyle={{
                  width: width * 0.8,
                  alignItems: 'flex-start',
                  alignSelf: 'center',
                  height: height * 0.1,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  pading: 15,
                }}
                inputStyle={{ color: 'white', marginLeft: 15 }}
                placeholderTextColor="#ccc"
                // value={newName}
                // onChangeText={value => setNewName(value)}
                value={value}
                onBlur={onBlur}
                onChangeText={val => onChange(val)}
                multiline
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Campo requerido!',
              },
              minLength: {
                value: 5,
                message: 'Minimo 5 caracteres',
              },
              maxLength: {
                value: 30,
                message: 'Maximo 30 caracteres',
              },
            }}
          />
          {errors.adress && (
            <Text style={styles.error}>{errors.adress.message}</Text>
          )}
          <Controller
            control={control}
            name="adress"
            defaultValue={adress}
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                placeholder="Direccion"
                inputContainerStyle={{
                  width: width * 0.8,
                  alignItems: 'flex-start',
                  alignSelf: 'center',
                  height: height * 0.1,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  pading: 15,
                }}
                inputStyle={{ color: 'white', marginLeft: 15 }}
                placeholderTextColor="#ccc"
                value={value}
                onBlur={onBlur}
                onChangeText={val => onChange(val)}
                multiline
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Campo requerido!',
              },
              minLength: {
                value: 5,
                message: 'Minimo 5 caracteres',
              },
              maxLength: {
                value: 50,
                message: 'Maximo 50 caracteres',
              },
            }}
          />
          {errors.img && <Text style={styles.error}>{errors.img.message}</Text>}
          <Controller
            control={control}
            name="img"
            defaultValue={img}
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                placeholder="Url de la imagen"
                inputContainerStyle={{
                  width: width * 0.8,
                  alignItems: 'flex-start',
                  alignSelf: 'center',
                  height: height * 0.1,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  pading: 15,
                }}
                inputStyle={{ color: 'white', marginLeft: 15 }}
                placeholderTextColor="#ccc"
                value={value}
                onBlur={onBlur}
                onChangeText={val => onChange(val)}
                multiline
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Campo requerido!',
              },
              minLength: {
                value: 5,
                message: 'Minimo 5 caracteres',
              },
              pattern: {
                value:
                  // eslint-disable-next-line no-useless-escape
                  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                message: 'Ingresa una url valida!',
              },
            }}
          />
          {errors.lat && <Text style={styles.error}>{errors.lat.message}</Text>}
          <Controller
            control={control}
            name="lat"
            defaultValue={String(lat)}
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                placeholder="Latitud"
                inputContainerStyle={{
                  width: width * 0.8,
                  alignItems: 'flex-start',
                  alignSelf: 'center',
                  height: height * 0.1,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  pading: 15,
                }}
                inputStyle={{ color: 'white', marginLeft: 15 }}
                placeholderTextColor="#ccc"
                value={value}
                onBlur={onBlur}
                onChangeText={val => onChange(val)}
                multiline
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Campo requerido!',
              },
              pattern: {
                value: /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
                message: 'Ingresa un numero',
              },
            }}
          />
          {errors.lon && <Text style={styles.error}>{errors.lon.message}</Text>}
          <Controller
            control={control}
            name="lon"
            defaultValue={String(lon)}
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                placeholder="Longitud"
                inputContainerStyle={{
                  width: width * 0.8,
                  alignItems: 'flex-start',
                  alignSelf: 'center',
                  height: height * 0.1,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  pading: 15,
                }}
                inputStyle={{ color: 'white', marginLeft: 15 }}
                placeholderTextColor="#ccc"
                value={value}
                onBlur={onBlur}
                onChangeText={val => onChange(val)}
                multiline
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Campo requerido!',
              },
              pattern: {
                value: /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
                message: 'Ingresa un numero',
              },
            }}
          />
          <Button title="Guardar" onPress={handleSubmit(onSubmit)} />
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    // color:'#fff',
    textAlign: 'center',
  },
  error: {
    // fontSize: 30,
    fontWeight: 'bold',
    color: '#ff0000',
    textAlign: 'center',
  },
  content: {
    // margin: width / 20,
    height: width / 2.5,
    width: width / 2.5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapDispatchToProps = dispatch => ({
  updateCenter: data => dispatch(actions.centers.updateCenter(data)),
});

const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CenterEdit);
