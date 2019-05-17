import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'

import { connect } from 'react-redux'


function CardDetails ( { name, onPress, question }) {
	return (
			<TouchableOpacity style={styles.btnCard} onPress={onPress}>
				<Text style={styles.questionText}>{question.question}</Text>
        <Text style={styles.questionText}>{question.answer}</Text>
			</TouchableOpacity>
	)
}


// todo: pass object to set card Tip and labels
/* cardSettings : {
  prompt: 'Tap to show'
  frontLabel: 'question',
  backLabel: 'answer',
} */
class QuizCard extends Component{
  state = {
    showFront: true,
  }
  flipCard = () => {
    this.setState((prevState) => ({
      showFront: !prevState.showFront,
    }));
  };
  render() {
    const { question, onPress, cardFront, cardBack } = this.props;
    const text = this.state.showFront?cardFront:cardBack;

    return (
        <TouchableOpacity style={styles.btnCard} onPress={this.flipCard}>
          <Text style={styles.questionText}>{text}</Text>
          <Text style={styles.cardTips}>Tap to show {this.state.showFront?'answer':'question'}</Text>
        </TouchableOpacity>
    )
  }
}



class QuizScreen extends Component {

	static navigationOptions = {
    title: 'Quiz',
  };
  getNextCard = () => {

  };

	render() {
		const { navigation } = this.props;
    console.log("Quiz");
    console.log("currentDeck: ", this.props.currentDeck);
    console.log(this.props.quizCards);
		return (
			<ScrollView style={{backgroundColor: '#000', color: '#fff'}}>
				<View style={styles.container}>
					<Text style={{fontSize: 30, color: '#999',}}>
						Start Quiz
					</Text>
					{this.props.quizCards.questions.map((question) => <QuizCard
							key={question.question}
						 	cardFront={question.question}
              cardBack={question.answer}

						 	/>  )}
				</View>
			</ScrollView>
		)
	}
}

//  {this.props.decks.map(( {name}) => <DeckDetails key={name} name={name} count={1} />  )}
// {Object.keys(this.props.decks)}
function mapStateToProps( { entries, appState } ) {
  const { currentDeck } = appState;

	return {
		quizCards: entries[currentDeck],
    currentDeck,
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
  questionText: {
  	color: '#000',
  	fontSize: 25,
		paddingTop: 20,
		paddingBottom: 20,
  },
   btnCard: {
    backgroundColor: '#bcaaa4',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#795548',
    //height: 45,
    margin: 15,
    marginLeft: 40,
    marginRight: 40,
    width: "95%",
    //alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  cardTips: {
    fontSize: 16,
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

export default connect(mapStateToProps)( QuizScreen )