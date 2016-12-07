const actions = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
    // case 'TOGGLE_TODO':
      return [
        ...state,
        action
      ]
    default:
      return state
  }
}

export default actions