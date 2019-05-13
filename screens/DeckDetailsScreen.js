import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native'
//import
import { deleteDeck } from '../actions';
import { fetchCardDecks } from '../utils/api';
import { createDeck } from '../utils/api.js';
import { connect } from 'react-redux'

function BasicBtn ({ onPress, btnLabel }) {
  return (
    <TouchableOpacity
      style={Platform.OS ==='ios' ? styles.iosBasicBtn : styles.androidBasicBtn}
      onPress={onPress}>
        <Text style={styles.basicBtnText}>{btnLabel}</Text>
    </TouchableOpacity>
  )
}

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

	deleteCurrentDeck = () => {
		this.props.dispatch( deleteDeck( this.props.currentDeck ) );
	};
	render() {
		const { entries, currentDeck } = this.props;
		return (
			<ScrollView style={{backgroundColor: '#000', color: '#fff'}}>
			{ currentDeck

			?<View style={styles.container}>
					<DeckDetails
							key={currentDeck}
							name={currentDeck}
							questions={entries[currentDeck].questions}
							count={1}
						/>

						<BasicBtn
							btnLabel='Add Card'
							onPress={this.goToNewCard}
						 />

						<BasicBtn
							btnLabel='Start Quiz'
							onPress={() => {console.log('starting Quiz')} }
						/>

						<BasicBtn
							btnLabel='Delete Deck'
							onPress={this.deleteCurrentDeck}
						/>

				</View>
			: <Text style={styles.errorMessage}>Deck not found!</Text>}
			</ScrollView>
		)
	}
}

//  {this.props.decks.map(( {name}) => <DeckDetails key={name} name={name} count={1} />  )}
// {Object.keys(this.props.decks)}
function mapStateToProps( {entries, appState} ) {
	console.log("DeckDetails.mapStateToProps:", appState )
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