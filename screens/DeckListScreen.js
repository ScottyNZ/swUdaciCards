import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
//import
import { newDeck } from '../actions';
import { fetchCardDecks } from '../utils/api';
import { createDeck } from '../utils/api.js';
import { connect } from 'react-redux'


function DeckDetails ( { name, questions, count }) {
	return (
		<View>
			<Text style={styles.deckTitle}>{name}</Text>
			<Text style={{fontSize:20, color: '#bbb'}}>{count} cards</Text>
			{questions.map(( {question, answer} ) => {
				return (
					<View key={question}>
						<Text style={styles.cardText}>Q: {question}</Text>
						<Text style={styles.cardText}>A: {answer}</Text>
					</View>
				)
			})}
		</View>
	)
}

class DeckListScreen extends Component {
	static navigationOptions = {
    title: 'Deck List',
  };
	render() {

		return (
			<ScrollView style={{backgroundColor: '#000', color: '#fff'}}>
				<Text style={{fontSize: 30, color: '#999',}}>
					DECKS
				</Text>
				{Object.keys(this.props.entries).map((name) => <DeckDetails key={name} name={name}
					 questions={this.props.entries[name].questions}  count={1} />  )}

			</ScrollView>
		)
	}
}

//  {this.props.decks.map(( {name}) => <DeckDetails key={name} name={name} count={1} />  )}
// {Object.keys(this.props.decks)}
function mapStateToProps(entries) {

	return {
		entries
	}
};


//<Text>{questions.map((question) => <Text>{question.question} </Text>)}</Text>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckTitle: {
  	color: '#dba',
  	fontSize: 25,
		paddingTop: 20,
		paddingBottom: 20,
  },
  cardText: {
  	color: '#aaa',
  	fontSize: 22,
		paddingTop: 10,
		paddingBottom: 10,
  }
});

export default connect(mapStateToProps)( DeckListScreen )