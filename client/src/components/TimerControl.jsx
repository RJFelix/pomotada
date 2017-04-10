import React from "react";
import { connect } from "react-redux";
import { startTimer, stopTimer, pauseTimer, timerFinished, advanceProgram, resetProgram } from "../actions";
import PlayArrow from "material-ui/svg-icons/av/play-arrow";
import Pause from "material-ui/svg-icons/av/pause";
import Stop from "material-ui/svg-icons/av/stop";
import FastForward from "material-ui/svg-icons/av/fast-forward";
import IconButton from "material-ui/IconButton";

function TimerControl(props) {
  return(
    <div>
      {props.isRunning && 
        <span>
          {!props.isPaused &&
          <IconButton
            tooltip="Pause Timer"
            onTouchTap={props.pauseTimer}
          >
            <Pause />
          </IconButton>
          }
          {props.isPaused &&
          <IconButton
            tooltip="Start Timer"
            onTouchTap={props.startTimer}
          >
            <PlayArrow />
          </IconButton>
          }
          <IconButton
            tooltip="End timer"
            onTouchTap={props.stopTimer}
          >
            <Stop />
          </IconButton>
        </span>      
      }
      {!props.isRunning &&
        <IconButton
          tooltip="Start timer"
          onTouchTap={props.startTimer}
        >
          <PlayArrow />
        </IconButton>
      }
      <IconButton
        tooltip="Skip to next step"
        onTouchTap={props.advanceProgram}
      >
        <FastForward />
      </IconButton>
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
    stopTimer: () => { dispatch(stopTimer()); dispatch(resetProgram()); },
    finishTimer: () => { dispatch(timerFinished()); dispatch(advanceProgram()); },
    advanceProgram: () => dispatch(advanceProgram())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerControl);