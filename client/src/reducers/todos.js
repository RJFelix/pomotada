import actions from "../actions/actions";

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
        console.log("Added todo to active category " + activeCategory.id);
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
      active: false,
      order: newTodos.length
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
      console.info("Todo ids: " + state.todos.map((todo) => todo.id));
      return {};
    } else {
      newTodos[idx].finished = !newTodos[idx].finished;
      newTodos[idx].active = false;
      return { todos: newTodos };
    }
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
    let newTodos = Array.from(state.todos);
    const idx = newTodos.findIndex((todo) => todo.id === action.id);
    if(idx < 0) {
      console.error(`SET_ACTIVE_TODO reducer: action.id ${action.id} is not a valid todo id.`);
      return {};
    } else {
      if(newTodos[idx].finished) {
        newTodos[idx].active = false;
      } else {
        newTodos[idx].active = !newTodos[idx].active;
        // deactivate all other todos
        newTodos = newTodos.map((todo, i) => i === idx 
                                             ? todo 
                                             : Object.assign({}, todo, { active: false }));
      }
      return { todos: newTodos };
    }
  },
  [actions.CLEAR_ACTIVE_TODO](state, action) {
    const newTodos = Array.from(state.todos)
                          .map((todo) => Object.assign({}, todo, { active: false }));
    return { todos: newTodos };
  },
  [actions.SET_TODO_ORDER](state, action) {
    let newTodos = state.todos.slice();
    const idx = newTodos.findIndex(todo => todo.id === action.id);
    newTodos[idx].order = action.order;
    return { todos: newTodos }
  }
}

export default reducers;