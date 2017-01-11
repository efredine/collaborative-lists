import ContentTypes from '../types/ContentTypes.js';
import VoteStates from '../types/VoteStates';
import { Glyphicon } from 'react-bootstrap';
import React, {Component} from 'react';

function outerClassForContentType(contentType) {
  switch(contentType) {
    case ContentTypes.MOVIE:
      return "movieChat"
    case ContentTypes.YELP:
      return "restaurantChat";
    default:
      return "";
  }
}

function innerClassForContentType(contentType) {
  switch(contentType) {
    case ContentTypes.MOVIE:
      return "movieChatBox"
    case ContentTypes.YELP:
      return "restChatBox";
    default:
      return "";
  }
}

function getName(action) {
  return action.actingUser;
}

function getContentForContentType(content) {
  switch(content.contentType) {
    case ContentTypes.TODO:
      return content.text;
    case ContentTypes.MOVIE:
      return content.title
    case ContentTypes.YELP:
      return content.name;
    default:
      return "";
  }
}

function getFormatedContent(content) {
  const { contentType } = content;
  return(
    <span className={outerClassForContentType(contentType)}>
      <span className={innerClassForContentType(contentType)}>
      {getContentForContentType(content)}
      </span>
    </span>
  );
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
  const itemVotedOn = state.find(x => x.id === action.voteId);
  if (action.vote === VoteStates.NONE && itemVotedOn.content.contentType === "movie") {
    return (
      <span className="movieChat">
         &nbsp;canceled vote on&nbsp;
         <span className="movieChatBox">
        {getContentForContentType(itemVotedOn.content)}
          </span>
      </span>
      )

  }

  if (action.vote === VoteStates.NONE && itemVotedOn.content.contentType === "yelp") {
    return (
      <span className="resturauntChat">
         &nbsp;canceled vote on&nbsp;
         <span className="restChatBox">
        {getContentForContentType(itemVotedOn.content)}
        </span>
      </span>
      )

  }

   if (itemVotedOn.content.contentType === "movie") {

    return (
      <span className="movieChat">
        &nbsp;voted&nbsp;
        {getVoteIcon(action.vote)}
        &nbsp;on&nbsp;
         <span className="movieChatBox">
        {getContentForContentType(itemVotedOn.content)}
         </span>
      </span>
      );
  }

    if (itemVotedOn.content.contentType === "yelp") {

      return (
      <span className="resturauntChat">
        &nbsp;voted&nbsp;
        {getVoteIcon(action.vote)}
        &nbsp;on&nbsp;
        <span className="restChatBox">
        {getContentForContentType(itemVotedOn.content)}
        </span>
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
        text: getFormatedContent(action.content)
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
        type: '',
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
        text: 'the chat'
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
      if(action.activeList === action.listId) {
        return [
          ...state,
          getActionRecord(state, action)
        ]
      } else {
        return state;
      }
    default:
      return state
  }
}

export default actions