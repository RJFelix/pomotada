import React from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import { removeCategory } from "../actions";

function RemoveCategory(props) {
  return(
    <RaisedButton
      label={`Remove category ${props.category.title}`}
      onTouchTap={props.removeCategory(props.category.id)}
    />
  )
}

function mapDispatchToProps(dispatch) {
  return {
    removeCategory: (id) => (evt) => dispatch(removeCategory(id))
  }
}

export default connect(null, mapDispatchToProps)(RemoveCategory);