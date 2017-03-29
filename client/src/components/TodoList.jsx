import { List } from "material-ui/List";
import TodoListItem from "./TodoListItem";
import AddTodo from "./AddTodo";
import { connect } from "react-redux";
import React from "react";

function TodoList(props) {
  return(
    <div>
      <List>
        {props.todos.map(todo =>
          <TodoListItem
            key={todo.id}
            text={todo.text}
          />
        )}
      </List>
      <AddTodo />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

export default connect(mapStateToProps)(TodoList);