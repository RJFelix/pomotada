import { List } from "material-ui/List";
import TodoListItem from "./TodoListItem";
import AddTodo from "./AddTodo";
import React from "react";

import "./TodoList.css";

export default function TodoList(props) {
  return(
    <div>
      <List>
        {props.todos.filter((todo) => !todo.finished).map(todo =>
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
        {props.todos.filter((todo) => todo.finished).map(todo =>
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