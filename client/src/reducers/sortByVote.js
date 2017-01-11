const sortByVote = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SORT_BY_VOTE':
      return !state;
    default:
      return state
  }
}

export default sortByVote;