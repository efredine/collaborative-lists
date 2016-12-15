export const addTodo = (text) => ({
  type: 'SERVER/ADD_TODO',
  text
});

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const toggleTodo = (id) => {
  return {
    type: 'SERVER/TOGGLE_TODO',
    id
  };
}

export const startDrag = () => ({
  type: 'START_DRAG'
});

export const move = (draggedId, overId) => ({
  type: 'SERVER/MOVE',
  draggedId,
  overId
});

export const endDrag = () => ({
  type: 'END_DRAG'
});
