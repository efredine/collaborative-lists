// current drag is the one at the top of the drag lisst
const currentDrag = (state) => {
  const length = state.drags.dragStarts.length;
  return state.drags.dragStarts[length-1];
}

// return current index of todo
const find = (todos, todoId) => {
  return todos.findIndex(t => t.id === todoId);
}

// move a todo from one index to another index
const moveTodos = (todos, index, atIndex) => {
  const result = todos.slice();
  const todo = result.splice(index, 1);
  result.splice(atIndex, 0, todo[0]);
  return result;
}

const move = (state, action) => {
  const dragStart = currentDrag(state);
  const overId = action.id;

  // index is the current index of the todo being dragged
  const index = find(state.todos, dragStart.todoId);

  // atIndex is the index of the todo that we are currently dragging over
  const atIndex = find(state.todos, overId);
  state.todos = moveTodos(state.todos, index, atIndex);
  state.drags.moves.push(Object.assign({}, dragStart, {
    overId,
    index,
    atIndex
  }));
  return state;
}

// called to complete a drag action
const endDrag = (state, action) => {
  const dragStart = currentDrag(state);

  // get the moves associated with this drag
  const moves = state.drags.moves.filter(m => m.dragId === dragStart.dragId);
  if(!action.didDrop) {
    // undo the moves
    if(moves.length > 0) {
      // move from the current index back to the index of the first move.
      const atIndex = moves[0].index;
      const index = find(state.todos, dragStart.todoId);
      state.todos = moveTodos(state.todos, index, atIndex);

      // delete all the moves associated with this drag
      state.drags.moves = state.drags.moves.reduce([], (moves, move) => {
        if(move.dragId !== dragStart.dragId) {
          moves.push(move);
        }
        return moves;
      });
    }
  } else {
    // save this as a successful drag
    state.drags.dragEnds.push(dragStart);
  }
}

const moves = (state, action) => {
  switch (action.type) {
    case 'START_DRAG':
      const newState = Object.assign({}, state)
      newState.todos = newState.todos.reverse()
      return newState;
    case 'MOVE':
      return move(state, action);
    case 'END_DRAG':
      return state;
    default:
      return state;
  }
}

export default moves