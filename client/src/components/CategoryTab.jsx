import React from "react";
import { connect } from "react-redux";
import { Tabs, Tab } from "material-ui-scrollable-tabs/Tabs";
import TodoList from "./TodoList";
import { setActiveCategory } from "../actions";
import AddCategory from "./AddCategory";
import Add from "material-ui/svg-icons/content/add";
import RemoveCategory from "./RemoveCategory";

function CategoryTab(props) {
  return (
    <Tabs
      initialSelectedIndex={props.categories.findIndex((cat) => cat.active)}
      tabType="scrollable-buttons"
    >
      {props.categories.map((category) => 
        <Tab
          label={category.title}
          key={category.id}
          onActive={() => props.setActiveCategory(category.id)}
        >
          <div className="content">
            <TodoList
              todos={props.todos.filter((todo) => todo.category === category.id)}
            />
            <RemoveCategory
              category={category}
            />
          </div>
        </Tab>
      )}
      <Tab
        icon={<Add />}
      >
        <div className="content">
          <AddCategory />
        </div>
      </Tab>
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