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

const move = (todos, action) => {
  const {draggedId, overId} = action;

  // index is the current index of the todo being dragged
  const index = find(todos, draggedId);

  // atIndex is the index of the todo that we dragged over
  const atIndex = find(todos, overId);

  return moveTodos(todos, index, atIndex);
}

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_CARD':
      if (state.id !== action.id) {
        return state
      }
      return Object.assign(
        {},
        state,
        {
          completed: !state.completed
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
        todo(undefined, action)
      ]
    case 'TOGGLE_CARD':
      return state.map(t =>
        todo(t, action)
      )
    case 'MOVE_CARD':
      return move(state, action);
    default:
      return state
  }
}

export default cards
