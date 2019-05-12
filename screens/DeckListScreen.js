import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
//import
import { setCurrentDeck } from '../actions';
import { fetchCardDecks } from '../utils/api';
import { createDeck } from '../utils/api.js';
import { connect } from 'react-redux'


function DeckDetails ( { name, onPress, count }) {
	return (
			<TouchableOpacity style={styles.btn} onPress={onPress}>
				<Text style={styles.deckTitle}>{name}</Text>
				<Text style={{fontSize:20, color: '#bbb'}}>{count} cards</Text>
			</TouchableOpacity>
	)
}

class DeckListScreen extends Component {
	static navigationOptions = {
    title: 'Deck List',
  };
  goToDeckDetails = (deckTitle) => {
  	this.props.dispatch(setCurrentDeck(deckTitle));
  	this.props.navigation.navigate('DeckDetails');
  }
	render() {
		const { navigation } = this.props;
		return (
			<ScrollView style={{backgroundColor: '#000', color: '#fff'}}>
				<View style={styles.container}>
					<Text style={{fontSize: 30, color: '#999',}}>
						DECKS
					</Text>
					{Object.keys(this.props.entries).map((name) => <DeckDetails key={name}
							name={name}
						 	questions={this.props.entries[name].questions}
						 	onPress={() => this.goToDeckDetails(name)}
						 	count={1} />  )}
				</View>
			</ScrollView>
		)
	}
}

//  {this.props.decks.map(( {name}) => <DeckDetails key={name} name={name} count={1} />  )}
// {Object.keys(this.props.decks)}
function mapStateToProps({entries}) {

	return {
		entries
	}
};


//<Text>{questions.map((question) => <Text>{question.question} </Text>)}</Text>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckTitle: {
  	color: '#d99',
  	fontSize: 30,
		paddingTop: 20,
		paddingBottom: 20,
  },
   btn: {
    backgroundColor: '#555',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 4,
    //height: 45,
    margin: 15,
    marginLeft: 40,
    marginRight: 40,
    width: "80%",
    //alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#5B481F',
    elevation: 4,

  },
  cardText: {
  	color: '#aaa',
  	fontSize: 22,
		paddingTop: 10,
		paddingBottom: 10,
  }
});

export default connect(mapStateToProps)( DeckListScreen )