import React, { Component } from 'react';
import { Text, Dimensions, StyleSheet, SafeAreaView, View , Alert } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

const height = Dimensions.get('window').height;

class Reset extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: ""
    }
  }

  resetPassword(email) {
    auth().
    sendPasswordResetEmail(email)
    .then(() => {
      Alert.alert('Operacion exitosa', 'Revisa tu correo')                      
    })
    .catch(error => {
      console.error(error)
      error.code === 'auth/user-not-found' ? 
        Alert.alert("Error", "Email no encontrado") : (
        error.code === 'auth/invalid-email' ?
          Alert.alert("Error", "Email invalido.") :
          Alert.alert("Error", "Algo salio mal, intenta nuevamente")
        )
    });
  }

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
          <Text style={styles.title}>Ingresa tu email</Text>
          <Input
            placeholder="Email"
            value={this.state.email}
            onChangeText={text => this.setState({email: text})}
            leftIcon={
              <Icon
                name={'envelope'}
                type="font-awesome-5"
                size={18}
                color={'#9a73ef'}
              />
            }
            inputStyle={styles.input}
          />
          <Button title="Recuperar contraseña"
            buttonStyle={styles.submitButton}
            onPress={() => {
              const {email} = this.state
              email.trim() ? this.resetPassword(email) : Alert.alert("Error", "Ingrasa tu email.")
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Reset

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#5ff575',
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
