import VoteStates from '../types/VoteStates';

// return current index of todo
const find = (cards, id) => {
  return cards.findIndex(c => c.id === id);
}

// move a card from one index to another index
const moveCardsByIndex = (cards, index, atIndex) => {
  const result = cards.slice();
  const card = result.splice(index, 1);
  result.splice(atIndex, 0, card[0]);
  return result;
}

const moveCard = (cards, action) => {
  const {draggedId, overId} = action;

  // index is the current index of the todo being dragged
  const index = find(cards, draggedId);

  // atIndex is the index of the todo that we dragged over
  const atIndex = find(cards, overId);

  return moveCardsByIndex(cards, index, atIndex);
}

const card = (state, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return {
        id: action.id,
        content: action.content,
        completed: false
      }
    case 'TOGGLE_CARD':
      if (state.id !== action.toggleId) {
        return state
      }
      return Object.assign(
        {},
        state,
        {
          completed: !state.completed
        });
    case 'VOTE_CARD':
      if (state.id !== action.voteId) {
        return state
      }
      return Object.assign(
        {},
        state,
        {
          vote: action.vote
        });
    default:
      return state
  }
}

const cards = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return [
        ...state,
        card(undefined, action)
      ]
    case 'TOGGLE_CARD':
    case 'VOTE_CARD':
      return state.map(t =>
        card(t, action)
      )
    case 'MOVE_CARD':
      return moveCard(state, action);
    default:
      return state
  }
}

export default cards
