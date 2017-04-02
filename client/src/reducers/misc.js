import actions from "../actions/actions";

const reducers = {
  [actions.TOGGLE_LEFT_MENU](state, action) {
    return { leftMenuOpen: !state.leftMenuOpen }
  }
}

export default reducers;