import React from "react";
import TextField from "material-ui/TextField";

class DurationField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: Math.floor(props.value / 3600),
      minutes: Math.floor((props.value % 3600) / 60),
      seconds: Math.floor(props.value % 60)
    }
  }

  handleChangeHours = (evt, hours) => {
    this.setState({
      hours: Number(hours)
    }, () => this.props.onChange(evt, this.calcTotalSeconds()));
  }

  handleChangeMinutes = (evt, minutes) => {
    this.setState({
      minutes: Number(minutes)
    }, () => this.props.onChange(evt, this.calcTotalSeconds()));
  }

  handleChangeSeconds = (evt, seconds) => {
    this.setState({
      seconds: Number(seconds)
    }, () => this.props.onChange(evt, this.calcTotalSeconds()));
  }

  calcTotalSeconds = () => (this.state.hours * 3600) + (this.state.minutes * 60) + Number(this.state.seconds);

  render() {
    return(
      <div
        style={{paddingLeft: "24px"}}
      >
        <TextField
          floatingLabelText="Hours"
          value={this.state.hours}
          type="number"
          onChange={(evt, val) => this.handleChangeHours(evt, val)}
          name="DurationFieldHours"
          style={{
            width: "2em"
          }}
          inputStyle={{
            textAlign: "right"
          }}
        />
        <span> : </span>
        <TextField
          floatingLabelText="Mins"
          value={this.state.minutes < 10 ? "0" + this.state.minutes : this.state.minutes}
          type="number"
          name="DurationFieldMinutes"
          style={{
            width: "2em"
          }}
          inputStyle={{
            textAlign: "right"
          }}
          onChange={(evt, val) => this.handleChangeMinutes(evt, val)}
        />
        <span> : </span>
        <TextField
          floatingLabelText="Secs"
          value={this.state.seconds < 10 ? "0" + this.state.seconds : this.state.seconds}
          type="number"
          onChange={(evt, val) => this.handleChangeSeconds(evt, val)}
          name="DurationFieldSeconds"
          style={{
            width: "2em"
          }}
          inputStyle={{
            textAlign: "right"
          }}
        />
      </div>
    )
  }
}

export default DurationField;