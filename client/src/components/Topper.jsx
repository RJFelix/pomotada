import React from "react";
import { connect } from "react-redux";
import AppBar from "material-ui/AppBar";
import { toggleLeftMenu } from "../actions";

function Topper(props) {
  return(
    <AppBar
      title="Pomotada"
      onLeftIconButtonTouchTap={props.toggleLeftMenu}
    />
  )
}

function mapDispatchToProps(dispatch) {
  return {
    toggleLeftMenu: () => dispatch(toggleLeftMenu())
  }
}

export default connect(null, mapDispatchToProps)(Topper);