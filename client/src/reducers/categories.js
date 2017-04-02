import actions from "../actions/actions";

const reducers = {
  [actions.ADD_CATEGORY](state, action) {
    // new category should be active category
    const newCategories = Array.from(state.categories)
                               .map((category) => Object.assign({}, category, { active: false }))
    // get a new ID 1 greater than the largest existing ID
    const newId = newCategories.reduce(
      (accum, cv) => (cv.id > accum ? cv.id : accum),
      0
    ) + 1;
    newCategories.push({
      title: action.title,
      id: newId,
      active: true
    });
    return { categories: newCategories };
  },
  [actions.REMOVE_CATEGORY](state, action) {
    const newCategories = Array.from(state.categories)
                               .filter((category) => category.id !== action.id);
    // Remove all todos associated with the removed category
    // (is this a good idea?)
    //  -- maybe we could save them or put them into an "uncategorized" bin or something?
    // if todos are going to be removed we should prompt to confirm removing the category!
    const newTodos = Array.from(state.todos)
                          .filter((todo) => todo.category !== action.id);
    return { 
      categories: newCategories,
      todos: newTodos
    };
  },
  
  [actions.SET_ACTIVE_CATEGORY](state, action) {
    const newCategories = Array.from(state.categories)
                               .map((category) => Object.assign({}, category, { active: false }));
    const idx = newCategories.findIndex((category) => category.id === action.id);
    if(idx < 0) {
      console.error(`SET_ACTIVE_CATEGORY reducer: action.id ${action.id} is not a valid category id.`);
      return {};
    } else {
      newCategories[idx].active = true;
      return { categories: newCategories };
    }
  },
}

export default reducers;