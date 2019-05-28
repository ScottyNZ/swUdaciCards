import React from 'react';
import { Button, ScrollView, Text, View, StyleSheet } from 'react-native';
import { Constants, Notifications } from 'expo';
import { connect } from 'react-redux';

import { MonoText } from '../components/StyledText';


class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'App Test functions',
  };

  async scheduleLocalNotification() {
    const localNotification = {
      title: 'Quiz Reminder!',
      body: "👋 Dont' forget to study today!",
      ios: {
        sound: true,
      },
      android: {
        channelId: 'study-reminders',
      },
    }

    const schedulingOptions = {
      time: (new Date()).getTime() + 5000,
    }
    await Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
  }

  render() {
    const { manifest } = Constants;
    return (
      <ScrollView>
        <Text style={[styles.settingsModeText, {fontWeight: 'bold'}]}>swUdaciCards Version: {manifest.version}</Text>
        <Text style={styles.settingsModeText}>Test Utilities for UdaciCards</Text>
        <Button onPress={this.scheduleLocalNotification} title="Schedule Local Notification in 5 seconds" />
        <Text style={styles.settingsModeText}>Current Deck: {this.props.currentDeck}</Text>
        <Text style={styles.settingsModeText}>Cards in Redux store</Text>
        <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
              <MonoText style={styles.codeHighlightText}>{JSON.stringify(this.props.entries)}</MonoText>
          </View>
      </ScrollView>
    )
  }
}

function mapStateToProps( {entries, appState} ) {
  return {
    entries,
    currentDeck: appState.currentDeck
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  settingsModeText: {
    margin: 3,
    color: '#000',
    fontSize: 14,
    lineHeight: 19,
   // textAlign: 'center',
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
});


export default connect(mapStateToProps)(SettingsScreen);