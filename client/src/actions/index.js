import actions from "./actions";

// -1 => default to active category
export function addTodo(text, category = -1) {
  return {
    type: actions.ADD_TODO,
    text,
    category
  }
}

export function removeTodo(id) {
  return {
    type: actions.REMOVE_TODO,
    id
  }
}

export function toggleTodo(id) {
  return {
    type: actions.TOGGLE_TODO,
    id
  }
}

export function addCategory(title) {
  return {
    type: actions.ADD_CATEGORY,
    title
  }
}

export function removeCategory(id) {
  return {
    type: actions.REMOVE_CATEGORY,
    id
  }
}

export function addPomo(id /* of todo item */) {
  return {
    type: actions.ADD_POMO,
    id
  }
}

export function removePomo(id /* of todo item */) {
  return {
    type: actions.REMOVE_POMO,
    id
  }
}

export function toggleActiveTodo(id /* of todo item */) {
  return {
    type: actions.TOGGLE_ACTIVE_TODO,
    id
  }
}

export function clearActiveTodo() {
  return {
    type: actions.CLEAR_ACTIVE_TODO
  }
}

export function startTimer() {
  return {
    type: actions.START_TIMER
  }
}

export function pauseTimer() {
  return {
    type: actions.PAUSE_TIMER
  }
}

export function stopTimer() {
  return {
    type: actions.STOP_TIMER
  }
}

export function setTimer(time /* in seconds */) {
  return {
    type: actions.SET_TIMER,
    time
  }
}

export function timerFinished() {
  return {
    type: actions.TIMER_FINISHED
  }
}

// to make available to other modules that don't include the actions themselves
export const APPSTATE = actions.SET_STATE;
export function setAppState(state) {
  if(!(state in Object.values(APPSTATE))) {
    console.error(`setAppState action creator: invalid state provided: ${state}`);
    return {
      type: actions.SET_STATE.DEFAULT
    }
  } else {
    return {
      type: state
    }
  }
}

// to make available to other modules that don't want to include the actions themselves
export const SETTING = actions.SET_SETTING;
export function setSetting(setting, value) {
  if(!(setting in Object.values(SETTING))) {
    console.error(`setSetting action creator: invalid setting provided: ${setting}`);
    return {
      type: null
    }
  } else {
    return {
      type: setting,
      value
    }
  }
}