import React from "react";
import CategoryTab from "../components/CategoryTab";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import { startTimer, setAppState, APPSTATE } from "../actions";

function AppDefault(props) {
  return(
    <div>
      <RaisedButton
        label="Work"
        onTouchTap={props.startWork}
      />
      <CategoryTab />
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    startWork: () => {
      dispatch(startTimer());
    }
  }
}

export default connect(null, mapDispatchToProps)(AppDefault);