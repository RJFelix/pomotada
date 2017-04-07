import { List } from "material-ui/List";
import TodoListItem from "./TodoListItem";
import AddTodo from "./AddTodo";
import React from "react";
import { SortableContainer, arrayMove } from "react-sortable-hoc";

import "./TodoList.css";

const SortableTodoList = SortableContainer(({todos}) => {
  return(
      <List>
        {todos.map((todo, idx) =>
          <TodoListItem
            todo={todo}
            index={idx}
            key={idx}
          />
        )}
      </List>
  );
});

export default class TodoList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      todos: props.todos.slice()
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    let newTodos = this.state.todos;
    newTodos = arrayMove(newTodos, oldIndex, newIndex);
    newTodos.forEach((todo, idx) => {
      this.props.setTodoOrder(todo.id, idx);
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("TodoList will receive props:");
    console.log(JSON.stringify(nextProps));
    this.setState({
      todos: nextProps.todos
    })
  }

  render() {
    return(
      <div>
        <SortableTodoList
          todos={this.state.todos.sort((a, b) => a.order - b.order)}
          onSortEnd={this.onSortEnd}
          useDragHandle={true}
        />
        <AddTodo />
      </div>
    )
  }
}