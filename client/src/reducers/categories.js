import actions from "../actions/actions";

const reducers = {
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