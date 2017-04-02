import React from "react";
import { connect } from "react-redux";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import Divider from "material-ui/Divider";
import { toggleLeftMenu } from "../actions";


class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.shouldOpen
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.shouldOpen !== this.state.open) {
      this.setState({
        open: nextProps.shouldOpen
      })
    }
  }

  render() {
    return(
      <Drawer
        docked={false}
        width={400}
        open={this.state.open}
        onRequestChange={this.props.toggle}
      >
        <MenuItem>Item</MenuItem>
        <MenuItem>Another Item</MenuItem>
        <Divider />
        <MenuItem
          primaryText="Close Menu"
          onTouchTap={this.props.toggle}
        />
      </Drawer>
    )
  }
}

function mapStateToProps(state) {
  return {
    shouldOpen: state.leftMenuOpen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: () => dispatch(toggleLeftMenu())
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(LeftMenu);