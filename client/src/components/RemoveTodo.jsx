import React from "react";
import { connect } from "react-redux";
import Delete from "material-ui/svg-icons/action/delete";
import { removeTodo } from "../actions";

function RemoveTodo(props) {
  return(
    <Delete
      onClick={() => props.removeTodo(props.id)}
    />
  )
}

function mapDispatchToProps(dispatch) {
  return {
    removeTodo: (id) => dispatch(removeTodo(id))
  }
}

export default connect(null, mapDispatchToProps)(RemoveTodo);