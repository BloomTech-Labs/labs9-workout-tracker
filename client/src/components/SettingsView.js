import React from "react";
import SideNav from "./SideNav";
import styled from "styled-components";

const SettingsViewStyle = styled.div`
  width: 100%;
  max-width: 880px;
`;

class SettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <SettingsViewStyle>
        SettingsView
        <SideNav />
      </SettingsViewStyle>
    );
  }
}

export default SettingsView;
