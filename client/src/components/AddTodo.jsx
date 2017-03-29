import React from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import ContentAdd from "material-ui/svg-icons/content/add";
import RaisedButton from "material-ui/RaisedButton";
import { addTodo } from "../actions";

class AddTodo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      textContent: ""
    }
  }

  handleChange = (evt, val) => {
    this.setState({
      textContent: val
    });
  }

  handleKeyPress = (evt) => {
    if(evt.key === "Enter") {
      this.maybeSubmitTodo();
    }
  }

  handleButton = (evt) => {
    this.maybeSubmitTodo();
  }

  maybeSubmitTodo = () => {
    if(this.state.textContent.trim().length > 0) {
      this.props.submitTodo(this.state.textContent);
      this.setState({
        textContent: ""
      });
    }
  }

  render() {
    return(
    <div>
      <TextField
        floatingLabelText="Item to add"
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        value={this.state.textContent}
      >
      </TextField>
      <RaisedButton
        label="Add Item"
        primary={true}
        icon={<ContentAdd />}
        onTouchTap={this.handleButton}
      >
      </RaisedButton>
    </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitTodo: (text) => dispatch(addTodo(text))
  }
}

export default connect(null, mapDispatchToProps)(AddTodo);