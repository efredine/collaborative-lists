const users = (state = {user: undefined}, action) => {
  switch (action.type) {
    case 'RECEIVE_USER':
      return action.user
    default:
      return state
  }
}

export default users