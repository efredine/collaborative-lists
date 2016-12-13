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

// export const startDrag = (id) => ({
//   type: 'START_DRAG',
//   id
// });

export const move = (draggedId, overId) => ({
  type: 'MOVE',
  draggedId,
  overId
});

// export const endDrag = (didDrop) => ({
//   type: 'END_DRAG',
//   didDrop
// });
