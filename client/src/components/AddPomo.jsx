import React from "react";
import { connect } from "react-redux";
import { addPomo } from "../actions";
import Mood from "material-ui/svg-icons/social/mood";

function AddPomo(props) {
  return(
    <Mood
      onClick={() => props.addPomo(props.id)}
    />
  )
}

function mapDispatchToProps(dispatch) {
  return {
    addPomo: (id) => dispatch(addPomo(id))
  }
}

export default connect(null, mapDispatchToProps)(AddPomo);