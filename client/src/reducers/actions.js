function resolvedToggleState(state, action) {
  const actionCount = state.filter(x => x.targetId === action.id).length;
  if(actionCount === 0 || actionCount % 2 === 0) {
    return 'Completed';
  } else {
    return 'Re-activated'
  }
}

function getActionRecord(state, action) {
  switch (action.type) {
    case 'MOVE_CARD':
      return Object.assign({}, action, {
        type: 'Moved',
        text: state.find(x => x.id === action.draggedId).text
      });
    case 'ADD_CARD':
      return Object.assign({}, action, {
        type: 'Added'
      });
    case 'TOGGLE_CARD':
      return {
        id: action.toggleId,
        targetId: action.id,
        type: resolvedToggleState(state, action),
        text: state.find(x => x.id === action.id).content.text
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
      return [
        ...state,
        getActionRecord(state, action)
      ]
    default:
      return state
  }
}

export default actions