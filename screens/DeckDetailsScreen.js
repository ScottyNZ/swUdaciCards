import React, { Component } from 'react';
import { Alert, View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';

import { deleteDeck } from '../actions';
import { fetchCardDecks, createDeck, removeDeck } from '../utils/api';
import { BasicBtn } from '../components/BasicBtn';

import { clearLocalNotification, setLocalNotification } from '../utils/helpers';


function DeckDetails ( { name, count }) {
  return (
    <View>
      <Text style={styles.deckTitle}>{name}</Text>
      <Text style={{fontSize:20, color: '#bbb'}}>{count} cards</Text>
    </View>
  )
}

class DeckDetailsScreen extends Component {
  static navigationOptions = {
      title: 'Deck Details',
    };

  goToNewCard = () => {
    this.props.navigation.navigate('NewCard');
  };

  goToQuiz = () => {
    clearLocalNotification()
      .then(setLocalNotification);
    this.props.navigation.navigate('Quiz');
  }

  deleteCurrentDeck = () => {
    removeDeck(this.props.currentDeck);
    this.props.dispatch( deleteDeck( this.props.currentDeck ) );
  };
  confirmDeleteDeck = () =>{
    Alert.alert(
      'Delete this Deck',
      'Deleting this Deck will remove it permanently from your device and CANNOT be undone.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Delete Deck', onPress: () => this.deleteCurrentDeck() },
      ],
      {cancelable: false},
    );

  };

  render() {
    const { entries, currentDeck } = this.props;
    return (
      <ScrollView style={{backgroundColor: '#000', color: '#fff'}}>
      { currentDeck
        ? <View style={styles.container}>
            <DeckDetails
              key={currentDeck}
              name={this.props.entries[currentDeck].title}
              questions={entries[currentDeck].questions}
              count={entries[currentDeck].questions.length}
            />
            <BasicBtn
              btnLabel='Add Card'
              onPress={this.goToNewCard}
             />
            <BasicBtn
              btnLabel='Start Quiz'
              onPress={this.goToQuiz}
            />
            <BasicBtn
              btnLabel='Delete Deck'
              onPress={this.confirmDeleteDeck}
            />
        </View>
        : <Text style={styles.errorMessage}>Deck not found!</Text>
      }
      </ScrollView>
    )
  }
}

//  {this.props.decks.map(( {name}) => <DeckDetails key={name} name={name} count={1} />  )}
// {Object.keys(this.props.decks)}
function mapStateToProps( {entries, appState} ) {
  return {
    entries,
    currentDeck: appState.currentDeck
  }
};


//<Text>{questions.map((question) => <Text>{question.question} </Text>)}</Text>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deckTitle: {
    color: '#dba',
    fontSize: 35,
    paddingTop: 20,
    paddingBottom: 20,
  },
  cardText: {
    color: '#aaa',
    fontSize: 22,
    paddingTop: 10,
    paddingBottom: 10,
  },
    iosBasicBtn: {
    backgroundColor: '#5B481F',
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidBasicBtn: {
    backgroundColor: '#555',
    padding: 40,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 4,
    height: 45,
    margin: 20,
    marginLeft: 40,
    marginRight: 40,
    width: "75%",
    //alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#5B481F',
    elevation: 4,

  },
  basicBtnText: {
    color: '#aa7727',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2},
    letterSpacing: 1
  },
  errorMessage: {
    color: '#d33',
    fontSize: 35,
    fontWeight: 'bold'
  },
});

export default connect(mapStateToProps)( DeckDetailsScreen )