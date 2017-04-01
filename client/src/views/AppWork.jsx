import React from "react";
import Timer from "../components/Timer";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import { stopTimer, setAppState, APPSTATE } from "../actions";

function AppWork(props) {
  return(
    <div>
      <RaisedButton
        label="Default"
        onTouchTap={props.stopWork}
      />
      <Timer />
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    stopWork: () => {
      dispatch(stopTimer());
      dispatch(setAppState(APPSTATE.DEFAULT));
    }
  }
}

export default connect(null, mapDispatchToProps)(AppWork);