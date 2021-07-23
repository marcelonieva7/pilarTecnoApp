import React, { Component } from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { Card, Button, Icon , ListItem } from 'react-native-elements'
import { connect } from 'react-redux';
import { actions } from '../Store/actions';
import { fetchComments } from '../api'
import { ScrollView } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class PostDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: []
    }
  }
  componentDidMount() {
    const {id} = this.props.route.params.item
    fetchComments({id})
      .then((resp) => {
        this.setState({comments: resp[1]})
      })
      .catch((err)=> {
        console.log(err)
      })
  }
  _del = () => {
    const { id } = this.props.route.params.item
    ///VALIDACIONES
    this.props.deletePost({ id }).then(() => {
      this.props.navigation.goBack();
    });
  };
  _edit = () => {
    const { item } = this.props.route.params
    this.props.navigation.navigate('PostEdit', { item })
  }
  render() {
    const {body, title} = this.props.route.params.item
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 85 }}>
        <ImageBackground
          style={[styles.content, { height, width }]}
          source={require('../assets/images/fondo1.jpg')}>
          <Card
            containerStyle={{backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 8}}>
            <Card.Title>{title}</Card.Title>
            <Card.Divider/>
              <Text style={{marginBottom: 10, color: "#ffffff"}}>
                {body}
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 8}}>
                <Button
                  icon={
                    <Icon
                    name='edit'
                    type="font-awesome-5"
                    size={18}
                    color='#ffffff'
                    style={{marginRight: 4}}
                  />}
                  buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  title='Editar'
                  onPress={() => this._edit()}
                  />
                <Button
                  icon={
                    <Icon
                    name='trash-alt'
                    type="font-awesome-5"
                    size={18}
                    color='#ffffff'
                    style={{marginRight: 4}}
                  />}
                  buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "red"}}
                  title='Borrar'
                  onPress={() => this._del()}
                  />
              </View>
          </Card>
          <Text
            style={{color: "#ffffff", marginVertical: 5}}
          >Comentarios</Text>
          <ScrollView>
          {
            !this.state.comments ?
            <ActivityIndicator/> :
            <View style={{width: width / 1.1, paddingBottom: 100}}>
              {this.state.comments.map((item, i) => ( 
                <ListItem containerStyle={{backgroundColor: "rgba(180,180,180,0.3)", borderRadius: 5, marginVertical: 15}} key={i} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle style={{marginVertical: 8}}>{item.email}</ListItem.Subtitle>
                    <ListItem.Subtitle>{item.body}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ))}
            </View>
          }
          </ScrollView>
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
  deletePost: (data) => dispatch(actions.posts.delpost(data)),
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
