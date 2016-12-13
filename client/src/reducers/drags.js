const startDrag = (state, action) => {
   state.dragStarts.push({
    dragId: state.nextDragId,
    todoId: action.id
  });
  state.nextDragId += 1;
  return state;
}

const drags = (state = {nextDragId: 0, dragStarts: [], moves:[], dragEnds:[]}, action) => {
  switch (action.type) {
    case 'START_DRAG':
      return startDrag(state, action);
    case 'MOVE':
    case 'END_DRAG':
    default:
      return state
  }
}

export default drags