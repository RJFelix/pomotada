import React from "react";
import { connect } from "react-redux";
import CheckCircle from "material-ui/svg-icons/action/check-circle";
import { finishTodo } from "../actions";

function CompleteTodo(props) {
  return(
    <CheckCircle
      onClick={() => props.finishTodo(props.id)}
    />
  )
}

function mapDispatchToProps(dispatch) {
  return {
    finishTodo: (id) => dispatch(finishTodo(id))
  }
}

export default connect(null, mapDispatchToProps)(CompleteTodo);