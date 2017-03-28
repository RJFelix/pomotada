import React from "react";

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: props.initialTime
    }
  }

  componentDidMount() {
    this.interval = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState(
      (prevState, props) => ({
        secondsRemaining: prevState.secondsRemaining > 0 ? prevState.secondsRemaining - 1 : 0
      })
    );
  }

  render() {
    return(
      <div>
        <h1>
          {formatTime(this.state.secondsRemaining)}
        </h1>
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