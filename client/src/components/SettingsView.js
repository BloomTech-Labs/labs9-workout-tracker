import React from "react";
import SideNav from "./SideNav";

class SettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        SettingsView
        <SideNav />
      </div>
    );
  }
}

export default SettingsView;
