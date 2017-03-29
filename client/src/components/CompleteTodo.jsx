import React from "react";
import { connect } from "react-redux";
import CheckCircle from "material-ui/svg-icons/action/check-circle";
import { toggleTodo } from "../actions";

function CompleteTodo(props) {
  return(
    <CheckCircle
      onClick={() => props.toggleTodo(props.id)}
    />
  )
}

function mapDispatchToProps(dispatch) {
  return {
    toggleTodo: (id) => dispatch(toggleTodo(id))
  }
}

export default connect(null, mapDispatchToProps)(CompleteTodo);