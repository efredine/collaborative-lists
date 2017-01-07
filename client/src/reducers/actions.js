import ContentTypes from '../types/ContentTypes.js';
import VoteStates from '../types/VoteStates';
import { Glyphicon } from 'react-bootstrap';
import React, {Component} from 'react';

function getName(action) {
  return action.actingUser;
}

function getContentForContentType(content) {
  switch(content.contentType) {
    case ContentTypes.TODO:
      return content.text;
    case ContentTypes.MOVIE:
      return content.title;
    case ContentTypes.YELP:
      return content.name;
    default:
      return "";
  }
}

function resolvedToggleState(state, action) {
  const actionCount = state.filter(x => x.toggleId === action.toggleId).length;
  if(actionCount === 0 || actionCount % 2 === 0) {
    return ' removed ';
  } else {
    return ' restored '
  }
}

function getVoteIcon(voteState) {
  switch(voteState) {
    case VoteStates.UP:
      return (
        <Glyphicon glyph="glyphicon glyphicon-thumbs-up" />
      );
    case VoteStates.DOWN:
      return (
        <Glyphicon glyph="glyphicon glyphicon-thumbs-down"/>
      );
    default:
      return "";
  }
}

function getVoteText(action, state) {
  if (action.vote === VoteStates.NONE) {
    return "nothing";
  } else {
    const itemVotedOn = state.find(x => x.id === action.voteId);
    return (
      <span>
        {getVoteIcon(action.vote)}
        &nbsp;on&nbsp;
        {getContentForContentType(itemVotedOn.content)}
      </span>
      );
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
        text: getVoteText(action, state)
      };
    case 'CHAT_MESSAGE':
      return {
        user: getName(action),
        id: action.id,
        type: ':  ',
        text: action.text
      };
    case 'ADD_USER_TO_LIST':
      return {
        user: getName(action),
        id: action.id,
        type: ' joined ',
        text: 'list'
      };
     case 'UPDATE_TITLE':
      return {
        user: getName(action),
        id: action.id,
        type: ' updated title to ',
        text: action.title
      };
    default:
      return null;
  }
}

const actions = (state = [], action) => {
  console.log("updating with action:", action);
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
    case 'ADD_USER_TO_LIST':
    case 'UPDATE_TITLE':
      return [
        ...state,
        getActionRecord(state, action)
      ]
    default:
      return state
  }
}

export default actions