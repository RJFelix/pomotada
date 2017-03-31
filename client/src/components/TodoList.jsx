import { List } from "material-ui/List";
import TodoListItem from "./TodoListItem";
import AddTodo from "./AddTodo";
import { connect } from "react-redux";
import React from "react";


import "./TodoList.css";

function TodoList(props) {
  return(
    <div>
      <List>
        {props.todos.map(todo =>
          <span
            key={todo.id}
          >
            <TodoListItem
              text={todo.text}
              id={todo.id}
              finished={todo.finished}
              pomoCount={todo.pomoCount}
              active={todo.active}
            />
          </span>
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