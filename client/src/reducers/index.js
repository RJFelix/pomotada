import actions from "../actions/actions";
import initialState from "./initialState";

/* map actions to reducers */
/* each reducer should return an object containing
   the difference between the previous state and new state.
   For no change, return an empty object. */
const reducers = {
  // action.category < 0 => use the active category
  [actions.ADD_TODO](state, action) {
    const newTodos = Array.from(state.todos);
    // get a new ID 1 greater than the largest existing ID
    const newID = newTodos.reduce(
      (accum, cv) => (cv.id > accum ? cv.id : accum),
      0
    ) + 1;
    let newTodoCategory;
    if(action.category >= 0) {
      newTodoCategory = action.category;
    } else {
      // use active category if it exists
      let activeCategory = state.categories.find((category) => category.active);
      if(activeCategory) {
        newTodoCategory = activeCategory.id;
      } else {
        console.error("ADD_TODO: no active category found, defaulting to 0");
        newTodoCategory = 0;
      }
    }
    newTodos.push({
      text: action.text,
      category: newTodoCategory,
      id: newID,
      pomoCount: 0, 
      active: false
    });
    return { todos: newTodos };
  },
  [actions.REMOVE_TODO](state, action) {
    const newTodos = Array.from(state.todos)
                          .filter((todo) => todo.id !== action.id);
    return { todos: newTodos };
  },
  [actions.TOGGLE_TODO](state, action) {
    const newTodos = Array.from(state.todos);
    const idx = newTodos.findIndex((todo) => todo.id === action.id);
    if(idx < 0) {
      console.error(`FINISH_TODO reducer: action.id ${action.id} is not a valid todo id.`);
      return {};
    } else {
      newTodos[idx].finished = !newTodos[idx].finished;
      return { todos: newTodos };
    }
  },
  [actions.ADD_CATEGORY](state, action) {
    const newCategories = Array.from(state.categories);
    // get a new ID 1 greater than the largest existing ID
    const newId = newCategories.reduce(
      (accum, cv) => (cv.id > accum ? cv.id : accum),
      0
    );
    newCategories.push({
      title: action.title,
      id: newId
    });
    return { categories: newCategories };
  },
  [actions.REMOVE_CATEGORY](state, action) {
    const newCategories = Array.from(state.categories)
                               .filter((category) => category.id !== action.id);
    return { categories: newCategories };
  },
  [actions.ADD_POMO](state, action) {
    const newTodos = Array.from(state.todos);
    const idx = newTodos.findIndex((todo) => todo.id === action.id);
    if(idx < 0) {
      console.error(`ADD_POMO reducer: action.id ${action.id} is not a valid todo id.`);
      return {};
    } else {
      newTodos[idx].pomoCount++;
      return { todos: newTodos };
    }
  },
  [actions.REMOVE_POMO](state, action) {
    const newTodos = Array.from(state.todos);
    const idx = newTodos.findIndex((todo) => todo.id === action.id);
    if(idx < 0) {
      console.error(`REMOVE_POMO reducer: action.id ${action.id} is not a valid todo id.`);
      return {};
    } else {
      newTodos[idx].pomoCount--;
      if(newTodos[idx].pomoCount < 0) {
        newTodos[idx].pomoCount = 0;
      }
      return { todos: newTodos };
    }
  },
  [actions.TOGGLE_ACTIVE_TODO](state, action) {
    const newTodos = Array.from(state.todos);
    const idx = newTodos.findIndex((todo) => todo.id === action.id);
    if(idx < 0) {
      console.error(`SET_ACTIVE_TODO reducer: action.id ${action.id} is not a valid todo id.`);
      return {};
    } else {
      newTodos[idx].active = !newTodos[idx].active;
      return { todos: newTodos };
    }
  },
  [actions.CLEAR_ACTIVE_TODO](state, action) {
    const newTodos = Array.from(state.todos)
                          .map((todo) => Object.assign({}, todo, { active: false }));
    return { todos: newTodos };
  },
  [actions.SET_ACTIVE_CATEGORY](state, action) {
    const newCategories = Array.from(state.categories);
    const idx = newCategories.findIndex((category) => category.id === action.id);
    if(idx < 0) {
      console.error(`SET_ACTIVE_CATEGORY reducer: action.id ${action.id} is not a valid category id.`);
      return {};
    } else {
      newCategories[idx].active = true;
      return { categories: newCategories };
    }
  },
  [actions.START_TIMER](state, action) {
    return { timerRunning: true };
  },
  [actions.STOP_TIMER](state, action) {
    return { timerRunning: false };
  },
  [actions.SET_TIMER](state, action) {
    return { timerTime: action.time };
  }
}

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