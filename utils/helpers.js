import React from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
//import { white, black, red, orange, blue, lightPurp, pink } from "./colors";
import { Notifications, Permissions} from 'expo'

const NOTIFICATION_KEY = 'swUdaciCards:notifications'

const styles = StyleSheet.create({
  iconContainer:{
    padding: 5,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  }
})



export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}


export function getDailyReminderValue() {
  return {
    today: "🖐 Don't forget to study today!"
  }
}


export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

/*
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
      time: (new Date()).getTime() + 2000,
    }
    await Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
  }
*/

function createNotification() {
  return {
    title: 'Quiz Reminder!',
    body: "👋 dont' forget to study today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null){
        Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
          if (status ==='granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

            //Set notification for 07:05am tomorrow
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(7);
            tomorrow.setMinutes(5);

            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time: tomorrow,
                repeat: 'day'
              }
            );

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));

          }
        })
      }
    })

}
