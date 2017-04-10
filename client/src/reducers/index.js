import initialState from "./initialState";

/* map actions to reducers */
/* each reducer should return an object containing
   the difference between the previous state and new state.
   For no change, return an empty object. */
/* reducers split into individual files */

import todos from "./todos";
import time from "./time";
import categories from "./categories";
import appState from "./appState";
import misc from "./misc";
import program from "./program";

const reducers = Object.assign({}, todos, time, categories, appState, misc, program);

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if(handlers.hasOwnProperty(action.type)) {
      return Object.assign({}, state, handlers[action.type](state, action));
    } else {
      return state;
    }
  }
}

export default createReducer(initialState, reducers);