import actions from "../actions/actions";

/*
  using the state actions as a stand-in enum of possible states
*/
const reducers = {
  [actions.SET_STATE.DEFAULT](state, action) {
    return { appState: actions.SET_STATE.DEFAULT }
  },
  [actions.SET_STATE.WORK](state, action) {
    return { appState: actions.SET_STATE.WORK }
  },
  [actions.SET_STATE.REST](state, action) {
    return { appState: actions.SET_STATE.REST }
  },
  [actions.SET_STATE.BREAK](state, action) {
    return { appState: actions.SET_STATE.BREAK }
  },
  [actions.SET_STATE.SETTINGS](state, action) {
    return { appState: actions.SET_STATE.SETTINGS }
  },
  [actions.REQUEST_STATE_CHANGE](state, action) {
    return {
      stateChangeRequested: true
    }
  },
  [actions.CONFIRM_STATE_CHANGE](state, action) {
    return {
      stateChangeRequested: false
    }
  }
}

export default reducers;  