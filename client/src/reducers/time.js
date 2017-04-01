import actions from "../actions/actions";

const reducers = {
  [actions.START_TIMER](state, action) {
    if(state.timerRunning && state.timerPaused) {
      return { timerPaused: false }
    } else {
      return { timerRunning: true, timerPaused: false, timerTime: 15 };
    }    
  },
  [actions.PAUSE_TIMER](state, action) {
    return { timerPaused: true }
  },
  [actions.STOP_TIMER](state, action) {
    return { timerRunning: false, timerPaused: false };
  },
  [actions.SET_TIMER](state, action) {
    return { timerTime: action.time };
  },
  [actions.TIMER_FINISHED](state) {
    //temp test
    console.info("Timer finished.");
    // in the future, should update program state accordingly:
    // WORK => REST 
    // REST => WORK 
    // WORK => BREAK
    // BREAK => WORK
    // probably have an interstitial state for each transition
    // prompting user to enter next state
    return { timerRunning: false };
  }
}

export default reducers;