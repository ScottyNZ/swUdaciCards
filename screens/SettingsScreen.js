import React from 'react';
import { Button, ScrollView, Text } from 'react-native';
import { Constants, Notifications } from 'expo';

export default class SettingsScreen extends React.Component {
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
  	return (
  		<ScrollView>
  			<Text>Test Utilities for UdaciCards</Text>
    		<Button onPress={this.scheduleLocalNotification} title="Schedule Local Notification" />
    	</ScrollView>
    )
  }
}
