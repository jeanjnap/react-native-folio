import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';

var RNFS = require('react-native-fs');

const activityStarter = NativeModules.ActivityStarter;
const eventEmitter = new NativeEventEmitter(activityStarter);
eventEmitter.addListener(activityStarter.MyEventName, (params) => titleAlert("params", params));

var path = RNFS.DocumentDirectoryPath + '/';
var file = "arquivo.epub"

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      status: ""
    }
  }

  _download = () => {
    
    this.setState({ status: "Baixando..." });
    /*alert("Baixando: " + this.state.url);
    */

    RNFS.downloadFile(
      {
        fromUrl: this.state.url,
        toFile: path + file
      }
    ).promise.then(res => {
      this.setState({ status: "Abrindo..." });
      activityStarter.nativeFunction(path + file);
    }, error => {
      this.setState({ status: "Erro no download" });
      console.log(error);
      
      alert("Erro ao baixar o arquivo");
    });

    //activityStarter.nativeFunction("caminho");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>

        <TextInput
          style={{ height: 40, width: '90%', margin: 15, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => this.setState({ url: text })}
          value={this.state.url}
        />

        <Button
          onPress={this._download}
          title="Download and Open"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />

        <Text style={styles.welcome}>
          {this.state.status}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
