import React from "react";
import { connect } from "react-redux";
import { Tabs, Tab } from "material-ui-scrollable-tabs/Tabs";
import TodoList from "./TodoList";
import { setActiveCategory, startTimer, setTodoOrder } from "../actions";
import AddCategory from "./AddCategory";
import Add from "material-ui/svg-icons/content/add";
import RaisedButton from "material-ui/RaisedButton";

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
              setTodoOrder={props.setTodoOrder}
            />
            {!props.inRest &&
            <div
              style={{
                marginTop: "24px"
              }}
            >
              <RaisedButton
                onTouchTap={props.startWork}
                primary={true}
                label="Begin"
              />
            </div>
            }
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
CategoryTab.propTypes = {
  inRest: React.PropTypes.bool
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveCategory: (id) => dispatch(setActiveCategory(id)),
    startWork: () => {
      dispatch(startTimer());
    },
    setTodoOrder: (id, order) => dispatch(setTodoOrder(id, order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTab);