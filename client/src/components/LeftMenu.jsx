import React from "react";
import { connect } from "react-redux";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import { toggleLeftMenu, setAppState, APPSTATE } from "../actions";


class LeftMenu extends React.Component {
  static propTypes = {
    windowHeight: React.PropTypes.number.isRequired
  }

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

  handleOpenSettings = () => {
    this.props.openSettings();
    this.props.toggle();
  }

  handleCloseSettings = () => {
    this.props.closeSettings();
    this.props.toggle();
  }

  render() {
    const drawerHeight = `${this.props.windowHeight - 64}px`;
    return(
      <Drawer
        docked={true}
        width={300}
        open={this.state.open}
        onRequestChange={this.props.toggle}
        containerStyle={{position: "absolute", top: "64px", height: drawerHeight }}
      >
        { !this.props.settingsOpen &&
        <MenuItem
          primaryText="Settings"
          onTouchTap={this.handleOpenSettings}
        />
        }
        { this.props.settingsOpen &&
        <MenuItem
          primaryText="Close Settings"
          onTouchTap={this.handleCloseSettings}
        />
        }
      </Drawer>
    )
  }
}

function mapStateToProps(state) {
  return {
    shouldOpen: state.leftMenuOpen,
    settingsOpen: state.appState === APPSTATE.SETTINGS
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: () => dispatch(toggleLeftMenu()),
    openSettings: () => dispatch(setAppState(APPSTATE.SETTINGS)),
    closeSettings: () => dispatch(setAppState(APPSTATE.DEFAULT))
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(LeftMenu);