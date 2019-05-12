import { combineReducers } from 'redux';

import { RECEIVE_ENTRIES, NEW_DECK, ADD_CARD, SET_CURRENT_DECK } from '../actions'


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
    default :
      return state;
  }
}


function entries (state = {}, action) {
  /* console.log("entries Reducer Called");
  console.log("state:", state);
  console.log("Action:", action.type);
  console.log("Action:", JSON.stringify(action)); */
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
      return state ;

  //      ...state,
  //      ...action.entry

    default :
      return state
  }
}

export default combineReducers({
  entries,
  appState,

})
