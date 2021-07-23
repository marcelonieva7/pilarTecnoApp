import React, { Component } from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { actions } from '../Store/actions';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class PostEdit extends Component {
  constructor(props) {
    super(props);
    const {title, body} = this.props.route.params.item
    this.state = {
      title: title,
      body: body,
    }
  }
  _update = () => {
    const { id } = this.props.route.params.item
    const { title, body } = this.state;
    ///VALIDACIONES
    this.props.updatePost({ title, body , id}).then(() => {
      this.props.navigation.navigate('Posts')
    });
  };
  render() {
    const {body, title} = this.state
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ImageBackground
          style={[styles.content, { height, width }]}
          source={require('../assets/images/fondo1.jpg')}>
          <Input
            placeholder={title}
            inputContainerStyle={{
              width: width * 0.8,
              alignItems: 'flex-start',
              alignSelf: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
              pading: 15,
            }}
            inputStyle={{ color: 'white', marginLeft: 15 }}
            placeholderTextColor="#ccc"
            value={title}
            onChangeText={(value) => this.setState({ title: value })}
          />
          <Input
            placeholder={body}
            inputContainerStyle={{
              width: width * 0.8,
              alignItems: 'flex-start',
              alignSelf: 'center',
              height: height * 0.4,
              backgroundColor: 'rgba(0,0,0,0.5)',
              pading: 15,
            }}
            inputStyle={{ color: 'white', marginLeft: 15 }}
            placeholderTextColor="#ccc"
            value={body}
            onChangeText={(value) => this.setState({ body: value })}
            multiline
            numberOfLines={2}
          />
          <Button
            title="Guardar"
            onPress={() => this._update()}
            style={{ width: width * 0.8 }}
          />
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
    margin: width / 20,
    height: width / 2.5,
    width: width / 2.5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapDispatchToProps = (dispatch) => ({
  updatePost: (data) => dispatch(actions.posts.updatePost(data)),
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);
