
import { RECEIVE_ENTRIES, NEW_DECK, ADD_CARD } from '../actions'

function entries (state = {}, action) {
  console.log("Reducer Called");
  console.log("state:", state);
  console.log("Action:", action.type);
  console.log("Action:", JSON.stringify(action));
  switch (action.type) {
    case RECEIVE_ENTRIES :
      return {
        ...state,
        ...action.entries,
      }
    case NEW_DECK :
      return {
        ...state,
        [action.deckTitle] : {
          title: action.deckTitle, questions: []
        }
      }
    case ADD_CARD :
      return {
  //      ...state,
  //      ...action.entry
      }
    default :
      return state
  }
}

export default entries
