import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { setCurrentDeck } from '../actions';
import { fetchCardDecks } from '../utils/api';
import { createDeck } from '../utils/api';


function DeckDetails ( { name, onPress, count }) {
	return (
			<TouchableOpacity style={[styles.btn, count > 0 ? null: {backgroundColor: '#9e9e9e'}]} onPress={onPress}>
				<Text style={styles.deckTitle}>{name}</Text>
				<Text style={{fontSize:20, color: '#444'}}>{count} cards</Text>
			</TouchableOpacity>
	)
}

class DeckListScreen extends Component {
	static navigationOptions = {
    title: 'Deck List',
    headerStyle: {backgroundColor: '#558b2f',},
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
						Select a deck
					</Text>
					{Object.keys(this.props.entries).map((name) => <DeckDetails key={name}
							name={this.props.entries[name].title}
						 	questions={this.props.entries[name].questions}
						 	onPress={() => this.goToDeckDetails(name)}
						 	count={this.props.entries[name].questions.length} />  )}
				</View>
			</ScrollView>
		)
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
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckTitle: {
  	color: '#000',
  	fontSize: 30,
		paddingTop: 20,
		paddingBottom: 20,
  },
   btn: {
    backgroundColor: '#c7ddcd',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 4,
    margin: 15,
    marginLeft: 40,
    marginRight: 40,
    width: "80%",
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