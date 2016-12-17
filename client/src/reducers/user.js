const user = (state = {user: undefined, userInitialized: false}, action) => {
  switch (action.type) {
    case 'RECEIVE_USER':
      return Object.assign({}, action.user, {userInitialized:true});
    default:
      return state
  }
}

export default user