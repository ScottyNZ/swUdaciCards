//UdaciCards Project
import { AsyncStorage } from 'react-native'

const FLASHCARDS_STORAGE_KEY = "UdaciCards:decks"


function setSampleData () {

  console.log("Copying sample Data");
  let sampleData = {
	  React: {
	    title: 'React',
	    questions: [
	      {
	        question: 'What is React?',
	        answer: 'A library for managing user interfaces'
	      },
	      {
	        question: 'Where do you make Ajax requests in React?',
	        answer: 'The componentDidMount lifecycle event'
	      }
	    ]
	  },
	  JavaScript: {
	    title: 'JavaScript',
	    questions: [
	      {
	        question: 'What is a closure?',
	        answer: 'The combination of a function and the lexical environment within which that function was declared.'
	      }
	    ]
	  }
	};

	AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(sampleData))
	return sampleData;
}



export function formatCardDecks (cardDecks) {
	console.log(cardDecks);
  return cardDecks === null
    ? setSampleData()
    : JSON.parse(cardDecks);
}



export function fetchCardDecks() {
	console.log("Fetching Flashcards from AsyncStorage");
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then(formatCardDecks)
}


export function createDeck( deckTitle ) {
	const entry = { title: deckTitle, questions: [] };
	return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
		[deckTitle]: entry,
	}))
}


export function submitEntry({ entry, key }) {
	return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
		[key]: entry,
	}))

}

export function removeEntry(key) {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results);
			data[key] = undefined;
			delete data[key]
			AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
		})

}