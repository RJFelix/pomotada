import { List } from "material-ui/List";
import TodoListItem from "./TodoListItem";
import AddTodo from "./AddTodo";
import React from "react";
import { SortableContainer, arrayMove } from "react-sortable-hoc";
import { connect } from "react-redux";
import { toggleActiveTodo } from "../actions";

const SortableTodoList = SortableContainer(({todos, toggleActive}) => {
  return(
      <List>
        {todos.map((todo, idx) =>
          <TodoListItem
            todo={todo}
            toggleActive={() => toggleActive(todo.id)}
            index={idx}
            key={idx}
          />
        )}
      </List>
  );
});

class TodoList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      todos: props.todos
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    let newTodos = this.state.todos.slice();
    newTodos = arrayMove(newTodos, oldIndex, newIndex);
    newTodos.forEach((todo, idx) => {
      this.props.setTodoOrder(todo.id, idx);
    });
  }

  componentWillReceiveProps(nextProps) {
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
          toggleActive={this.props.toggleActive}
        />
        <AddTodo />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleActive: (id) => dispatch(toggleActiveTodo(id))
  }
}

export default connect(null, mapDispatchToProps)(TodoList);