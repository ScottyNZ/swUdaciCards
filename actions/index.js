export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const NEW_DECK = 'NEW_DECK'
export const ADD_CARD = 'ADD_CARD'


export function receiveEntries (entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries,
  }
}

export function newDeck (deckTitle) {
  return {
    type: NEW_DECK,
    deckTitle,
  }
}


// card is an object { question, answer }

export function addCard (deckTitle, card) {
  return {
    type: ADD_CARD,
    deckTitle,
    card
  }
}
