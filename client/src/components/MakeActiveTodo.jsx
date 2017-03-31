import React from "react";
import { connect } from "react-redux";
import { toggleActiveTodo } from "../actions";
import Assignment from "material-ui/svg-icons/action/assignment";

function MakeActiveTodo(props) {
  return(
    <Assignment
      onClick={() => props.makeActive(props.id)}
    />
  )
}

function mapDispatchToProps(dispatch) {
  return {
    makeActive: (id) => dispatch(toggleActiveTodo(id))
  }
}

export default connect(null, mapDispatchToProps)(MakeActiveTodo);