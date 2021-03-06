import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform,
  TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'

import { receiveEntries, newDeck } from '../actions';
import { fetchCardDecks, createDeck } from '../utils/api';


import { SubmitBtn } from '../components/SubmitBtn'



class NewDeckScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    deckTitle: '',
    errorMessage: '',
  };


  componentDidMount() {
    const { dispatch, entries } = this.props
    if (Object.keys(entries).length === 0 && entries.constructor === Object) {
        fetchCardDecks()
        .then((entries) => dispatch(receiveEntries(entries)))
        .then(({ entries }) => {
          console.log("Entries received");
          console.log(entries);
        })
        .then(() => this.setState(() => ({
          ready: true,

        })))
    }
    else {
      console.log('NewDeck: Decks already loaded!');
    }
  }


  submit = () => {
    const { deckTitle } = this.state;

    if( deckTitle.trim() === '') {
      this.setState(() => ( {
        errorMessage: 'Warning: Deck Title cannot be blank!'
      }));
      return;
    }
    this.props.dispatch(newDeck(deckTitle));

    createDeck( deckTitle );
    this.setState(() => ( {
      deckTitle: '',
      errorMessage: '',
    }));
    this.props.navigation.navigate('DeckDetails');
  };
  render() {
    const { deckTitle, errorMessage } = this.state;
    const { entries } = this.props;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        {errorMessage?<Text style={styles.errorMessage}>{errorMessage}</Text>:null}
        <Text style={styles.inputPrompt}>What is the title of your new deck?</Text>
        <TextInput
          value={deckTitle}
          style={styles.input}
          onChangeText={(text) => this.setState({deckTitle: text})}
          placeholder="Deck Title"
        />
        <SubmitBtn  onPress={this.submit} />
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps({entries}) {
  return {
    entries
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
    backgroundColor: '#000',
  },
  input: {
    fontSize: 28,
    color: '#FFC300',
    width: 300,
    height: 60,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#757575',
    marginBottom: 20
  },
  errorMessage: {
    fontSize: 24,
    color: '#cc0000',
    width: '95%',
    /*height: 120, */
    padding: 8,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#cc7575',
    marginBottom: 20,
  },
  inputPrompt: {
    fontSize: 36,
    alignSelf: 'flex-start',
    color: '#D78A29'

  },
  iosSubmitBtn: {
    backgroundColor: '#5B481F',
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: '#555',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 4,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#5B481F',
    elevation: 4,

  },
  submitBtnText: {
    color: '#aa7727',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2},
    letterSpacing: 1
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30,

  }
});

export default connect(mapStateToProps)(NewDeckScreen);