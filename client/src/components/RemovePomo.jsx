import React from "react";
import { connect } from "react-redux";
import { removePomo } from "../actions";
import MoodBad from "material-ui/svg-icons/social/mood-bad";

function RemovePomo(props) {
  return(
    <MoodBad
      onClick={() => props.removePomo(props.id)}
    />
  )
}

function mapDispatchToProps(dispatch) {
  return {
    removePomo: (id) => dispatch(removePomo(id))
  }
}

export default connect(null, mapDispatchToProps)(RemovePomo);