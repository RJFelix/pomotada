const initialState = {
  categories: [{
    title: "Work",
    id: 0,
    active: true
  },
  {
    title: "Study",
    id: 1,
    active: false
  }],
  todos: [{
    text: "Reticulate splines",
    id: 0,
    category: 0,
    active: false,
    finished: false,
    pomoCount: 0
  },
  {
    text: "Create Redux store",
    id: 1,
    category: 0,
    active: true,
    finished: false,
    pomoCount: 2
  },
  {
    text: "Make coffee",
    id: 2,
    category: 0,
    active: false,
    finished: true,
    pomoCount: 1
  },
  {
    text: "Learn test-driven development",
    id: 3,
    category: 1,
    active: false,
    finished: false,
    pomoCount: 0
  }],
  timerRunning: false,
  timerTime: 60
}

export default initialState;