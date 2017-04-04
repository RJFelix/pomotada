import actions from "../actions/actions";

const reducers = {
  [actions.SET_PROGRAM](state, action) {
    return { program: action.program }
  }
}

export default reducers;