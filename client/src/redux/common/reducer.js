export default function commonReducer(types) {
    return (state={}, action) => {
      const newState = {...state};
      const target = action.target;
      const targetState = {...state[target]};
      switch(action.type) {
        case types.request: 
           targetState.isLoading = true;
           targetState.payload = {};
           targetState.errors = {};
           targetState.result = "";
           newState[target] = targetState;
           return newState;
        case types.success:
           targetState.isLoading = false;
           targetState.payload = action.payload;
           targetState.errors = {};
           targetState.result = "OK";
           newState[target] = targetState;
           return newState;
        case types.failure:
            targetState.isLoading = false;
            targetState.payload = {};
            targetState.errors = action.errors;
            targetState.result = "Error";
            newState[target] = targetState;
            return newState;
        case types.destroy:
            delete newState[target];
            console.log("reducer.destroy new state = ");
            console.dir(newState);
            return newState;
        default: 
            return state;
      }
    };
}