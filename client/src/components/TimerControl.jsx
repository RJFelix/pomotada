import React from "react";
import { connect } from "react-redux";
import { startTimer, stopTimer, pauseTimer, setTimer } from "../actions";
import PlayArrow from "material-ui/svg-icons/av/play-arrow";
import Pause from "material-ui/svg-icons/av/pause";
import Stop from "material-ui/svg-icons/av/stop";

function TimerControl(props) {
  return(
    <div>
      {props.isRunning && 
        <span>
          {!props.isPaused &&
          <Pause
            onClick={props.pauseTimer}
          />
          }
          {props.isPaused &&
          <PlayArrow
            onClick={props.startTimer}
          />
          }
          <Stop
            onClick={props.stopTimer}
          />
        </span>      
      }
      {!props.isRunning &&
        <PlayArrow
          onClick={props.startTimer}
        />
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    isRunning: state.timerRunning,
    isPaused: state.timerPaused
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startTimer: () => dispatch(startTimer()),
    pauseTimer: () => dispatch(pauseTimer()),
    stopTimer: () => dispatch(stopTimer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerControl);