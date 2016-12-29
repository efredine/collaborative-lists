import ContentTypes from '../types/ContentTypes.js';
import VoteStates from '../types/VoteStates';
import { Glyphicon } from 'react-bootstrap';

function getName(action) {
  return action.actingUser;
}

function getContentForContentType(content) {
  switch(content.contentType) {
    case ContentTypes.TODO:
      return content.text;
    case ContentTypes.MOVIE:
      return content.original_title;
    default:
      return "";
  }
}

function resolvedToggleState(state, action) {
  const actionCount = state.filter(x => x.toggleId === action.toggleId).length;
  if(actionCount === 0 || actionCount % 2 === 0) {
    return 'CLOSED:';
  } else {
    return 'RE-ACTIVATED:'
  }
}

function getVoteText(action) {
  if (action.vote === VoteStates.NONE) {
    return "nothing";
  } else {
    return  action.vote;
  }
}

function getActionRecord(state, action) {
  switch (action.type) {
    case 'MOVE_CARD':
      return Object.assign({}, action, {
        user: getName(action),
        type: ' moved ',
        text: state.find(x => x.id === action.draggedId).text
      });
    case 'ADD_CARD':
      return Object.assign({}, action, {
        user: getName(action),
        type: ' added ',
        text: getContentForContentType(action.content)
      });
    case 'TOGGLE_CARD':
      return {
        user: getName(action),
        id: action.id,
        toggleId: action.toggleId,
        type: resolvedToggleState(state, action),
        text: state.find(x => x.id === action.toggleId).text
      };
    case 'VOTE_CARD':
      return {
        user: getName(action),
        id: action.id,
        voteId: action.voteId,
        type: ' voted ',
        text: getVoteText(action)
      };
    case 'CHAT_MESSAGE':
      return {
        user: getName(action),
        id: action.id,
        type: ':  ',
        text: action.text
      };
    default:
      return null;
  }
}

const actions = (state = [], action) => {
  switch (action.type) {
    case 'MOVE_CARD':
    case 'ADD_CARD':
    case 'TOGGLE_CARD':
    case 'VOTE_CARD':
    case 'CHAT_MESSAGE':
      return [
        ...state,
        getActionRecord(state, action)
      ]
    default:
      return state
  }
}

export default actions