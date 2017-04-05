import React from "react";
import { connect } from "react-redux";
import { timerFinished } from "../actions";
import TimerControl from "./TimerControl";
import CuteTimer from "./CuteTimer";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: props.assignedTime,
      isRunning: props.shouldRun
    }
    this.justFinished = false;
  }

  componentWillMount() {
    if(this.state.isRunning) {
      this.interval = setInterval(
        () => this.tick(),
        1000
      )
    }
  }

  componentWillUnmount() {
    if(this.interval) {
      clearInterval(this.interval);
    }
  }

  componentWillUpdate() {
    if(!this.justFinished && this.state.secondsRemaining === 0) {
      this.justFinished = true;
      this.props.timerFinished();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.shouldRun !== nextProps.shouldRun) {
      if(nextProps.shouldRun) {
        this.interval = setInterval(
          () => this.tick(),
          1000
        );
        this.justFinished = false;
        this.setState({
          secondsRemaining: nextProps.assignedTime,
          isRunning: true
        });
      } else { // should stop running
        clearInterval(this.interval);
        this.setState({
          isRunning: false
        })
      }
    }
  }

  tick() {
    if(!this.props.shouldPause) {
      this.setState(
        (prevState, props) => ({
          secondsRemaining: prevState.secondsRemaining > 0 ? prevState.secondsRemaining - 1 : 0
        })
      );
    }
  }

  render() {
    return(
      <div>
        <h1>
          {formatTime(this.state.secondsRemaining)}
        </h1>
        <CuteTimer
          time={this.props.assignedTime}
          running={this.props.shouldRun}
          finish={false}
         />
        <TimerControl />
      </div>
    );
  }
}

// Returns a properly formatted string of the form [minutes]:[seconds]
function formatTime(seconds) {
  const SECONDS_IN_HOUR = 3600; 
  const hoursPortion = Math.floor(seconds / SECONDS_IN_HOUR);
  const secondsLeftOver = seconds - (SECONDS_IN_HOUR * hoursPortion);
  const minutesPortion = Math.floor(secondsLeftOver / 60);
  const secondsPortion = seconds % 60;

  const returnString =
    (hoursPortion > 0 ? hoursPortion + ":" : "") +
    withLeadingZero(minutesPortion) + ":" +
    withLeadingZero(secondsPortion);

  return returnString;
}

function withLeadingZero(num) {
  return(
    (num >= 10 ? num : "0" + num).toString()
  )
}

function mapStateToProps(state) {
  return {
    shouldRun: state.timerRunning,
    assignedTime: state.timerTime,
    shouldPause: state.timerPaused
  }
}

function mapDispatchToProps(dispatch) {
  return {
    timerFinished: () => dispatch(timerFinished())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);