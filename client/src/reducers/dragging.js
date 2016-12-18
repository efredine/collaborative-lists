const dragging = (state = false, action) => {
  switch (action.type) {
    case 'START_DRAG':
      return true;
    case 'END_DRAG':
      return false;
    case 'MOVE_CARD':
      return false;
    default:
      return state
  }
}

export default dragging