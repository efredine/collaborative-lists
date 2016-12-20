const activeList = (state = null, action) => {
  switch (action.type) {
    case 'RECEIVE':
      return action.listId
    default:
      return state
  }
}

export default activeList