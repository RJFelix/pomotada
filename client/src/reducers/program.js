import actions from "../actions/actions";
import { APPSTATE } from "../actions";

const reducers = {
  [actions.SET_PROGRAM](state, action) {
    return { program: action.program }
  },
  [actions.ADVANCE_PROGRAM](state, action) {
    let nextProgramIndex = state.currentProgramIndex + 1;
    if(nextProgramIndex >= state.program.length) {
      // we don't have to handle stop conditions
      // if program were to stop at the end it would go to default view
      // default view cannot fire this action
      // only views with the timer can
      nextProgramIndex = 0;        
    }
    let nextActiveTask = false;  
    let newTodos = state.todos.slice();
    const nextStep = state.program[nextProgramIndex];
    if(nextStep.appState === APPSTATE.WORK) {
      if(nextStep.todo === APPSTATE.TASK.RANDOM) {
        nextActiveTask = Math.floor(Math.random() * 
          state.todos.filter(todo => todo.category === nextStep.category && !todo.finished).length
        );
      } else if(typeof nextStep.todo === typeof 1) {
        nextActiveTask = nextStep.todo;
      } else {
        console.log("No active task specified.");
      }
    }

    let shouldSelectTask = false;
    if(nextStep.appState === APPSTATE.REST) {
      // look ahead to see if we should be selecting
      if(nextProgramIndex < state.program.length) {
        if(state.program[nextProgramIndex + 1].todo === APPSTATE.TASK.SELECT) {
          shouldSelectTask = true;
        }
      } else {
        if(state.program[0].todo === APPSTATE.TASK.SELECT) {
          shouldSelectTask = true;
        }
      }
    }
    if(nextActiveTask) {
      newTodos = newTodos.map(todo => Object.assign(todo, { active: false }));
      const idx = newTodos.findIndex(todo => todo.id === nextActiveTask);
      newTodos[idx].active = true;
    }
    return {
      appState: nextStep.appState,
      currentProgramIndex: nextProgramIndex,
      timerTime: nextStep.time,
      todos: newTodos,
      shouldSelectTask
    }
  },
  [actions.RESET_PROGRAM](state, action) {
    return {
      currentProgramIndex: 0
    }
  }
}

export default reducers;