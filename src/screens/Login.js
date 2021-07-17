import React, { Component } from 'react';
import { Text, Dimensions, StyleSheet, SafeAreaView, View , Alert } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { actions } from '../Store/actions';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { NativeModules } from 'react-native';

const { RNTwitterSignIn } = NativeModules;

const height = Dimensions.get('window').height;

GoogleSignin.configure({
  webClientId: '271820691076-mi8bgh021brq3tvgftjv58pj25pv8eiq.apps.googleusercontent.com',
});

RNTwitterSignIn.init('v1t5b86gG9DmVVdJ8fggakNH2', 'CCIdIJ7fPrTrElNMLBPDY8u0G4Sg9EUDrzP4IxVJdovON1TreX').then(() =>
  console.log('Twitter SDK initialized'),
);

async function onTwitterButtonPress() {
  // Perform the login request
  const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();
  // Create a Twitter credential with the tokens
  const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);
  // Sign-in the user with the credential
  return auth().signInWithCredential(twitterCredential);
}

class LogIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: "",
      pass: ""
    }
  }

  onGoogleButtonPress = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  loginWhitEmail(user, pass) {
    auth()
    .signInWithEmailAndPassword(user, pass)
    .then(async (data) => {
      console.log('User account created & signed in!');
      if(data){
        console.log('res login: '+JSON.stringify(data.user))
        try {
          await AsyncStorage.setItem('isloged', JSON.stringify(data.user))
        } catch (e) {
          console.log('ubo un error :'+e)
        }
        this.props.setUser(data.user)
      }
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert("Error", "Email ya registrado.")
      }
      if (error.code === 'auth/invalid-email') {
        Alert.alert("Error", "Email invalido.")
      }
      if (error.code === 'auth/wrong-password') {
        Alert.alert("Error", "Contraseña incorrecta")
      }
      console.error(error);
    })
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
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subTitle}>Inicia sesión para continuar</Text>
          <Input
            placeholder="Usuario"
            value={this.state.user}
            onChangeText={text => this.setState({user: text})}
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
          <Button title="Ingresar" buttonStyle={styles.submitButton}
            onPress={() => {
              const {user, pass} = this.state
              user.trim() && pass.trim() ?
                this.loginWhitEmail(user, pass) :
                Alert.alert('Error', 'Revisa tus datos.')
            }}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button title="Crear usuario" buttonStyle={styles.optionsButton}
              onPress={() => this.props.navigation.navigate('Signup')}
            />
            <Button title="Reiniciar contraseña" buttonStyle={styles.optionsButton}
              onPress={() => this.props.navigation.navigate('Reset')}
            />
          </View>
          <GoogleSigninButton
            style={{ width: 192, height: 48, margin: 10 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={()=>this.onGoogleButtonPress()
              .then(async(data)=>{
                console.log('Signed in with Google!')
                if(data){
                  console.log('res login: '+JSON.stringify(data.user))
                  try {
                    await AsyncStorage.setItem('isloged', JSON.stringify(data.user))
                  } catch (e) {
                    console.log('ubo un error :'+e)
                  }
                  this.props.setUser(data.user)
                }
              })
            }
          />
          <Button
            title="Acceder con Twitter"
            style={{ margin: 10 }}
            icon={
              <Icon
                name={'twitter'}
                type="font-awesome-5"
                size={22}
                color={'#ffffff'}
                style={{marginHorizontal: 5}}
              />
            }
            onPress={() => onTwitterButtonPress()
              .then(async(data)=>{
                console.log('Signed in with Twitter!')
                if(data){
                  try {
                    await AsyncStorage.setItem('isloged', JSON.stringify(data.user))
                  } catch (e) {
                    console.log('ubo un error :'+e)
                  }
                  this.props.setUser(data.user)
                }
              })
              .catch((err)=>{
                console.error("error twitter signin" + err)
                if (err.code === "auth/account-exists-with-different-credential") {
                  Alert.alert('Error', 'Ya existe una cuenta creada con ese email, logueate con tu correo.')
                }
              })
            }
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

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#5ff575',
    margin: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#5ff575',
    margin: 10,
  },
  input: {
    margin: 8,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    marginVertical: 11,
    padding: 12,
  },
  optionsButton: {
    backgroundColor: '#7a42f4',
    margin: 12,
    padding: 9,
  },
});

export default connect(mapStateToProps,mapDispatchToProps)((LogIn))