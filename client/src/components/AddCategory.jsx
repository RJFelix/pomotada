import React from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { addCategory } from "../actions";

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textContent: ""
    }
  }

  handleTextChange = (evt, val) => {
    this.setState({
      textContent: val
    })
  }

  handleSubmit = () => {
    this.props.addCategory(this.state.textContent);
    this.setState({
      textContent: ""
    })
  }

  render() {
    return(
      <div>
        <TextField
          floatingLabelText="New Category Name"
          onChange={this.handleTextChange}
        />
        <RaisedButton
          label="Add Category"
          onTouchTap={this.handleSubmit}
        />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCategory: (title) => dispatch(addCategory(title))
  }
}

export default connect(null, mapDispatchToProps)(AddCategory);