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
    },
      BasicMedical: {
      title: 'Basic Medical',
      questions: [
        {
          question: 'Brachi(o)',
          answer: 'Arm'
        },
        {
          question: 'Cardi(o)',
          answer: 'Heart'
        },
        {
          question: 'Derm(a), derm(o), dermat(o)',
          answer: 'Skin'
        },
        {
          question: 'Encephal(o)',
          answer: 'Brain'
        },
        {
          question: 'Gastr(o)',
          answer: 'Stomach'
        },
        {
          question: 'Pulmon(o)',
          answer: 'Lungs'
        },
      ]
    },
  };

  AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(sampleData))
  return sampleData;
}



export function formatCardDecks (cardDecks) {
  return cardDecks === null
    ? setSampleData()
    : JSON.parse(cardDecks);
}



export function fetchCardDecks() {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(formatCardDecks)
}


export function createDeck( deckTitle ) {
  const entry = { title: deckTitle, questions: [] };
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [deckTitle]: entry,
  }))
}


// submitCard accepts deckTitle and card, where card is an object { question, answer }

export function submitCard({ card, deckTitle }) {
  console.log("submitcard");
  console.log("card:", card);
  console.log("deckTitle:", deckTitle);
  console.log("card:", card);
  AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      const newValue = {
        [deckTitle] : {
          ...data[deckTitle],
            questions: data[deckTitle].questions.concat(card)
        }
      };
      console.log("submitCard newValue: ", newValue);
      return(newValue);
    })
    .then((newValue) => {
      return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(newValue));
    });
}

export function removeDeck(deckTitle) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[deckTitle] = undefined;
      delete data[deckTitle]
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    });
}