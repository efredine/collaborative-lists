import VoteStates from '../types/VoteStates';
import _ from 'lodash';

function voteStateToCount(vote) {
  switch(vote) {
    case VoteStates.UP:
      return 1;
    case VoteStates.DOWN:
      return -1;
    default:
      return 0;
  }
}

function votesByUser(state, action) {
  const userId = action.userId;
  const newState = Object.assign({}, state)
  newState[userId] = voteStateToCount(action.vote);
  return newState;
}

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
        completed: false,
        currentVote: VoteStates.NONE,
        votesByUser: {},
        voteCount: 0,
        numberOfVotes: 0,
        thumbsUpCount: 0,
        thumbsDownCount: 0
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
        return state;
      }
      const updatedVotesByUser = votesByUser(state.votesByUser, action);
      const updatedState = Object.assign(
        {},
        state,
        {
          votesByUser: updatedVotesByUser,
          voteCount: _.reduce(updatedVotesByUser, (s, v) => s + v, 0),
          thumbsUpCount: _.reduce(updatedVotesByUser, (s, v) => s + (v > 0 ? 1 : 0), 0),
          thumbsDownCount: _.reduce(updatedVotesByUser, (s, v) => s + (v < 0 ? 1 : 0), 0),
          numberOfVotes: Object.keys(updatedVotesByUser).length
        });
      if (action.actingUser.id === action.currentUser.id) {
        updatedState.currentVote = action.vote;
      }
      return updatedState;
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
