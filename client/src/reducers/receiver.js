function receive(state, action, reducers) {
  switch (action.type) {
    case 'RECEIVE':
      const initialState = reducers(undefined, {type: "Initialize"});
      const reducedState = action.actionHistory.reduce((state, instanceAction) => {
          return reducers(state, instanceAction);
        }, initialState);
      return Object.assign({}, state, reducedState);
    default:
      return state;
  }
}

export default receive