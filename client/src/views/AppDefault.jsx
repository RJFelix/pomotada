import React from "react";
import CategoryTab from "../components/CategoryTab";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import { startTimer } from "../actions";

function AppDefault(props) {
  return(
    <div
      className="paper-interior"
    >
      <CategoryTab />
      <RaisedButton
        label="Start Work"
        onTouchTap={props.startWork}
      />
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