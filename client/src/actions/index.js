export const addTodo = (text) => ({
  type: 'SERVER/ADD_TODO',
  text
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'SERVER/TOGGLE_TODO',
  id
})
