import React from "react";
import TextField from "material-ui/TextField";
import formatTime from "../util/FormatTime";

export default function DurationField(props) {
  return(
    <TextField
      floatingLabelText={props.label}
      value={props.value}
      onChange={(evt, val) => props.onChange(evt, Number(val))}
      name="DurationField"
      style={{paddingLeft: "24px"}}
    />
  )
}

