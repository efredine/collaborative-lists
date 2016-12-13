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
    case 'MOVE':
      return Object.assign({}, action, {
        type: 'Moved'
      });
    case 'ADD_TODO':
      return Object.assign({}, action, {
        type: 'Added'
      });
    case 'TOGGLE_TODO':
      return {
        id: action.toggleId,
        targetId: action.id,
        type: resolvedToggleState(state, action),
        text: state.find(x => x.id === action.id).text
      };
    default:
      return null;
  }
}

const actions = (state = [], action) => {
  switch (action.type) {
    case 'MOVE':
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return [
        ...state,
        getActionRecord(state, action)
      ]
    default:
      return state
  }
}

export default actions