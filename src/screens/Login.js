import React, { Component } from 'react';
import { Text, Dimensions, StyleSheet, SafeAreaView, View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';

const height = Dimensions.get('window').height;

export class LogIn extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'column',
            height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#cceeff',
            padding: 10,
          }}>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subTitle}>Inicia sesión para continuar</Text>
          <Input
            placeholder="Usuario"
            leftIcon={
              <Icon
                name={'user'}
                type="font-awesome-5"
                size={18}
                color={'#9a73ef'}
              />
            }
            inputStyle={styles.input}
          />
          <Input
            placeholder="Contraseña"
            leftIcon={
              <Icon
                name={'key'}
                type="font-awesome-5"
                size={18}
                color={'#9a73ef'}
              />
            }
            inputStyle={styles.input}
          />
          <Button title="Ingresar" buttonStyle={styles.submitButton} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#5ff5757',
    margin: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'regular',
    color: '#5ff5757',
    margin: 10,
  },
  input: {
    margin: 8,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    margin: 15,
    padding: 12,
  },
});
