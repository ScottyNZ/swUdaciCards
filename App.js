import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon, Constants, Notifications } from 'expo';
import AppNavigator from './navigation/AppNavigator';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware'


import { setLocalNotification } from './utils/helpers'


function UdaciStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: 1 /*Constants.statusBarHeight*/}}>
      <StatusBar translucent backgroundColor={backgroundColor} { ...props} />
    </View>

  )
}


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('study-reminders', {
        name: 'swUdaciCards reminders',
        sound: true,
        vibrate: true,
        priority: 'high',
      })
    }
  }





  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={createStore(reducer)}  >
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <UdaciStatusBar backgroundColor='#077' hidden={true} barStyle='light-content'/>
          <AppNavigator />
        </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        // tab bar font for Icons
        ...Icon.Ionicons.font,
        // monospace font for displaying redux state on Setting/Dev Screen
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
