import { combineReducers } from 'redux';

import { RECEIVE_ENTRIES, NEW_DECK, ADD_CARD, SET_CURRENT_DECK, DELETE_DECK } from '../actions'


function appState (state = {currentDeck: ''}, action) {
  console.log("appState Reducer Called");
  console.log("state:", state);
  console.log("Action:", action.type);
  console.log("Action:", JSON.stringify(action));
  switch (action.type) {
    case SET_CURRENT_DECK :
      return {
        ...state,
        currentDeck: action.deckTitle,
      };
    case DELETE_DECK :
      return {
        ...state,
        currentDeck: '',
      };
    default :
      return state;
  }
}

const INITIAL_STATE = {};

function entries (state = INITIAL_STATE, action) {
  console.log("entries Reducer Called");
  console.log("state:", state);
  console.log("Action:", action.type);
  console.log("Action:", JSON.stringify(action));
  switch (action.type) {
    case RECEIVE_ENTRIES :
      return {
        ...state,
        ...action.entries,
      };
    case NEW_DECK :
      return {
        ...state,
        [action.deckTitle] : {
          title: action.deckTitle, questions: []
        }
      };
    case ADD_CARD :
      return {
        ...state,
        [action.deckTitle] : {
          ...state[action.deckTitle],
            questions: state[action.deckTitle].questions.concat(action.card)
        }
      };
    case DELETE_DECK :
      const { [action.deckTitle]: deleted, ...newState } = state;
      return newState;

    default :
      return state;
  }
}

export default combineReducers({
  entries,
  appState,

})
