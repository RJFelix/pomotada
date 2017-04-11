import React from "react";
import { connect } from "react-redux";

import IconButton from "material-ui/IconButton";
import MoreVert from "material-ui/svg-icons/navigation/more-vert";
import Popover from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import Divider from "material-ui/Divider";

import { toggleTodo, removeTodo } from "../actions";

import styles from "./TodoListItemPopover.css";

class TodoListItemPopover extends React.Component {
  static propTypes = {
    id: React.PropTypes.number.isRequired,
    finished: React.PropTypes.bool.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleButtonTouch = (evt) => {
    evt.preventDefault();
    this.setState({
      open: true,
      anchorElement: evt.currentTarget
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  render() {
    // style={this.props.style} passes down MUI internal props
    // required for IconButton to display properly!
    return (
      <IconButton 
        tooltip="More options"
        onTouchTap={this.handleButtonTouch}
        style={this.props.style}
        className={styles.button}
      >
        <MoreVert />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorElement}
          anchorOrigin={ {"horizontal": "left", "vertical": "bottom"} }
          targetOrigin={ {"horizontal": "left", "vertical": "top"} }
          onRequestClose={this.handleClose}
        >
          <Menu>
            <MenuItem 
              primaryText={ this.props.finished ? "Un-finish" : "Finish" }
              onTouchTap={ () => { this.handleClose(); this.props.toggleTodo(this.props.id) } } 
            />
            <MenuItem primaryText="Edit" disabled={true}/>
            <MenuItem primaryText="Archive" disabled={true} />
            <Divider />
            <MenuItem 
              primaryText="Delete"
              onTouchTap={ () => { this.handleClose(); this.props.removeTodo(this.props.id) } }
            />
          </Menu>
        </Popover>
      </IconButton>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleTodo: (id) => dispatch(toggleTodo(id)),
    removeTodo: (id) => dispatch(removeTodo(id))
  }
}

export default connect(null, mapDispatchToProps)(TodoListItemPopover);