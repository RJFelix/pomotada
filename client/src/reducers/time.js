import actions from "../actions/actions";
import { APPSTATE } from "../actions";

const reducers = {
  [actions.START_TIMER](state, action) {
    // resume from pause
    if(state.timerRunning && state.timerPaused) {
      return { timerPaused: false }
    } else {
      // start the program
      return { 
        timerRunning: true, 
        timerPaused: false, 
        timerTime: state.program[state.currentProgramIndex].time,
        appState: state.program[state.currentProgramIndex].appState
      };
    }    
  },
  [actions.PAUSE_TIMER](state, action) {
    return { timerPaused: true }
  },
  [actions.STOP_TIMER](state, action) {
    // this action breaks out of the programmed state transitions
    // but should not reset the program
    // because pomodoros are indivisible we don't need to track the time left on the clock
    // (though we could if we wanted to)
    return { 
      timerRunning: false, 
      timerPaused: false,
      appState: APPSTATE.DEFAULT
   };
  },
  [actions.SET_TIMER](state, action) {
    return { timerTime: action.time };
  },
  [actions.TIMER_FINISHED](state) {
    // add pomo to active task, if there is one & we just finished working
    // (ideally we could schedule an ADD_POMO event to be dispatched to separate concerns)
    // (via an async dispatch middleware)
    const newTodos = Array.from(state.todos);
    if(state.appState === APPSTATE.WORK) {
      const idx = newTodos.findIndex((todo) => todo.active);
      if(idx >= 0) {
        newTodos[idx].pomoCount++;
      }
    }
    // transition to next app state
    let newProgramIndex;
    if(state.currentProgramIndex + 1 >= state.program.length) {
      newProgramIndex = 0;
    } else {
      newProgramIndex = state.currentProgramIndex + 1;
    }
    return {
      todos: newTodos,
      appState: state.program[newProgramIndex].appState,
      timerRunning: true,
      timerPaused: false,
      timerTime: state.program[newProgramIndex].time,
      currentProgramIndex: newProgramIndex
    }
  }
}

export default reducers;