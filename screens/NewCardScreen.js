import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform,
	TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import { addCard } from '../actions';
import { submitCard } from '../utils/api';
import { SubmitBtn } from '../components/SubmitBtn'


class NewCard extends Component {
	static navigationOptions = {
    title: 'Add New Card'
  };
	state = {
		question: '',
		answer: ''
	};

	submit = () => {
		const { currentDeck } = this.props;
		const { question, answer } = this.state;
		const card = {
			question: question,
		 	answer: answer
		 	 };

		this.props.dispatch( addCard(currentDeck, card) );
		submitCard({ card, deckTitle: currentDeck });
		this.setState(() => ( {
			question: '',
			answer: ''
		}));

	}
	render() {
		const { question, answer } = this.state;

		return	(
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<Text style={styles.inputLabel}>Question</Text>
				<TextInput

					value={question}
					style={styles.input}
					onChangeText={(text) => this.setState({question: text})}
					placeholder="Enter question"
					name="question"
					returnKeyType='next'
				/>
				<Text style={styles.inputLabel}>Answer</Text>
				<TextInput

					value={answer}
					style={styles.input}
					onChangeText={(text) => this.setState({answer: text})}
					placeholder="Enter answer"
					name="answer"
				/>
				<SubmitBtn  onPress={this.submit} />

			</KeyboardAvoidingView>
		)
	}

}

function mapStateToProps( { appState } ) {
	return {
		currentDeck: appState.currentDeck
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
	inputLabel: {
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
})


export default connect(mapStateToProps)( NewCard );