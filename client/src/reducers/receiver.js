function receive(state, action, reducers) {
  switch (action.type) {
    case 'RECEIVE':
      const initialState = reducers(undefined, {type: "Initialize"});
      return action.actionHistory.reduce((state, instanceAction) => {
          return reducers(state, instanceAction);
        }, initialState);
    default:
      return state;
  }
}

export default receive