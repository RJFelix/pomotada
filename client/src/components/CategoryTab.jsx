import React from "react";
import { connect } from "react-redux";
import { Tabs, Tab } from "material-ui/Tabs";
import TodoList from "./TodoList";
import { setActiveCategory } from "../actions";

function CategoryTab(props) {
  return (
    <Tabs>
      {props.categories.map((category) => 
        <Tab
          label={category.title}
          key={category.id}
          onActive={() => props.setActiveCategory(category.id)}
        >
          <TodoList
            todos={props.todos.filter((todo) => todo.category === category.id)}
          />
        </Tab>
      )}
    </Tabs>
  )
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveCategory: (id) => dispatch(setActiveCategory(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTab);