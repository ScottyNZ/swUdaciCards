import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo';

import { BasicBtn } from '../components/BasicBtn'

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
class QuizCard extends Component {
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


class AnswerCard extends Component {
render() {
  const { question } = this.props;

  return (
    <React.Fragment>
      <QuizCard
        key={question.question}
        cardFront={question.question}
        cardBack={question.answer}
      />
      <BasicBtn
        style={{color:'#0d0', borderColor: '#0d0', backgroundColor: '#353',}}
        textStyle={{color: '#bbb'}}
        btnLabel='Correct'
        onPress={this.props.onCorrect}
      />
      <BasicBtn
        style={{color:'#d00', borderColor: '#d00', backgroundColor: '#533',}}
        textStyle={{color: '#bbb'}}
        btnLabel='Incorrect'
        onPress={this.props.onIncorrect}
      />
    </React.Fragment>
  )
}

}


class QuizScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizFinished: false,
      correctCount: 0,
      incorrectCount: 0,
      cardIndex : 0,
      cardCount : this.props.quizCards.questions.length,
    };
  }
	static navigationOptions = {
    title: 'Quiz',
  };
  onCorrect = () => {
    this.setState( (prevState) => ({
        correctCount : prevState.correctCount + 1,
        cardIndex : prevState.cardIndex + 1,
        quizFinished : (prevState.cardIndex + 1 >= prevState.cardCount),
      })
    );
  };

  onIncorrect = () => {
    this.setState( (prevState) => ({
        incorrectCount : prevState.incorrectCount + 1,
        cardIndex : prevState.cardIndex + 1,
        quizFinished : (prevState.cardIndex + 1 >= prevState.cardCount),
      })
    );
  };

  goToDeckDetails = () => {
    this.props.navigation.navigate('DeckDetails');
  }

  goToQuiz = () => {
    this.setState( () => ({
      quizFinished: false,
      correctCount: 0,
      incorrectCount: 0,
      cardIndex : 0,
      cardCount : this.props.quizCards.questions.length,
    }));
    this.props.navigation.navigate('Quiz');
  }

	render() {
		const { navigation } = this.props;
    const { cardIndex, cardCount, quizFinished, correctCount } = this.state;
    const question = this.props.quizCards.questions[cardIndex];

    if (quizFinished) {
      const percentCorrect = correctCount/cardCount * 100;
      return (
        <View style={{flex:1}}>
        <LinearGradient
          style={{ padding: 15, alignItems: 'center',  flex:1,}}
          colors={['#39527a', '#94acd3', '#e3e9f2']}>
          <Text style={{fontSize: 32, color: '#ddd',}}>
              Quiz Score: {correctCount}/{cardCount}
          </Text>
          <Text style={{fontSize: 28, color: '#ddd',}}>
              {percentCorrect}%
          </Text>
          <BasicBtn onPress={this.goToQuiz} btnLabel='Restart Quiz'/>
          <BasicBtn onPress={this.goToDeckDetails} btnLabel='Back to Deck'/>
        </LinearGradient>
        </View>
      );
    }

		return (
			<ScrollView style={{backgroundColor: '#000', color: '#fff'}}>
				<View style={styles.cardContainer}>
					<Text style={{fontSize: 24, color: '#333', alignSelf: 'flex-start',}}>
						Card {cardIndex+1}/{cardCount}
					</Text>
					<AnswerCard
            key={question.question}
            question={question}
            onCorrect={this.onCorrect}
            onIncorrect={this.onIncorrect}
          />
				</View>
			</ScrollView>
		)
	}
}

function mapStateToProps( { entries, appState } ) {
  const { currentDeck } = appState;

	return {
		quizCards: entries[currentDeck],
    currentDeck,
	}
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#bcaaa4',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#795548',
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