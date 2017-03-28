/*

Working "scratch pad" to plot out shape of the store

NOT ACTUAL CODE!

*/

const stateShape = {
  categories: [categoryShape],
  todos: [todoShape],
  settings: settings,
  tasksSinceBreak: 0,
  currentState: STATES.DEFAULT
}

const todoShape = {
  text: "text",
  id: 1, // unique
  category: 0, // id of category
  pomoCount: 0,
  active: false, // selected as current task
  finished: false 
}

const categoryShape = {
  title: "a title",
  id: 0, // unique
  // items: (id) => [items],
  active: false
}

const generalStuff = {
  tasksSinceBreak: 0,
  currentState: WORK, // or REST, BREAK, NONE
}

const settings = {
  timers: [
    {
      category: -1, // general settings
      task: {
        length: 1500
      },
      preTask: {
        length: 60,
        active: false
      },
      postTask: {
        length: 60,
        active: false
      },
      rest: {
        length: 300,
        active: true,
      },
      break: {
        length: 1800,
        active: true,
        frequency: 4 // number of work periods between rest periods
      }
    },
    {
      category: 0, // specific to category id=0
      task: {
        length: 1800
      },
      preTask: {
        length: 60,
        active: true
      },
      postTask: {
        length: 120,
        active: true
      },
      rest: {
        length: 300,
        active: true
      },
      break: {
        length: 1800,
        active: true,
        frequency: 4
      }
    }
  ]
}

