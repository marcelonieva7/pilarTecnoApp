import React, { Component } from 'react';
import { Text, Dimensions, StyleSheet, SafeAreaView, View , Alert } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { actions } from '../Store/actions';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const height = Dimensions.get('window').height;

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      pass: "",
      repeatPass: ""
    }
  }

  signupWithEmail(email, pass) {
    auth()
    .createUserWithEmailAndPassword(email, pass)
    .then(async (data) => {
        console.log('User account created & signed in!');
        if(data){
          console.log('res login: '+JSON.stringify(data.user))
          try {
            await AsyncStorage.setItem('isloged', JSON.stringify(data.user))
          } catch (e) {
            console.log('Hubo un error :'+e)
          }
          this.props.setUser(data.user)
        }
    })
    .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error', 'El email ya se encuentra registrado');
        }                
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'Email invalido');
        }                
        console.error(error);
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
          <Text style={styles.title}>Crea un nuevo usuario</Text>
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
          <Input
            placeholder="Contraseña"
            value={this.state.pass}
            onChangeText={text => this.setState({pass: text})}
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
          <Input
            placeholder="Repetir contraseña"
            value={this.state.repeatPass}
            onChangeText={text => this.setState({repeatPass: text})}
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
          <Button title="Ingresar" buttonStyle={styles.submitButton}
            onPress={() => {
              const {email, pass, repeatPass} = this.state
              email.trim() && pass.trim() && repeatPass.trim() ? (
                pass === repeatPass ?
                  this.signupWithEmail(email, pass) :
                  Alert.alert('Error', 'Las contraseñas no coinciden')
              ) : (
                Alert.alert('Error', 'Revisa tus datos.')
              )
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setUser: (data) =>
  dispatch(actions.user.setUser(data)),
})
const mapStateToProps = state => ({
  user: state.user.user
})

export default connect(mapStateToProps,mapDispatchToProps)((Signup))  

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
