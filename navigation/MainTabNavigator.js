import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator,
          createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import NewDeckScreen from '../screens/NewDeckScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DeckListScreen from '../screens/DeckListScreen';
import DeckDetailsScreen from '../screens/DeckDetailsScreen';
import NewCardScreen from '../screens/NewCardScreen';
import QuizScreen from '../screens/QuizScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const DeckListStack = createStackNavigator({
  DeckList: DeckListScreen,
  DeckDetails: DeckDetailsScreen,
  NewCard: NewCardScreen,
  Quiz: QuizScreen,
}, {initialRouteName: 'DeckList',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#558b2f',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  });

DeckListStack.navigationOptions = {
  tabBarLabel: 'Decks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'cards-outline' : 'cards-outline'}
    />
  ),
};

const NewDeckStack = createStackNavigator({
  NewDeck: NewDeckScreen,
});

NewDeckStack.navigationOptions = {
  tabBarLabel: 'New Deck',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const TabNav = Platform.OS === 'ios'
                 ? createBottomTabNavigator({ HomeStack, DeckListStack, NewDeckStack, SettingsStack})
                 : createMaterialTopTabNavigator({ HomeStack, DeckListStack, NewDeckStack, SettingsStack }, {
                  bounces: false,
                  tabBarOptions: {
                    style: {
                        backgroundColor: '#2e7d32',
                    },
                  }})

export default TabNav
