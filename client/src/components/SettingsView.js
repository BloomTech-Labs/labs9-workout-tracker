import React from "react";
import SideNav from "./SideNav";
import styled from "styled-components";

const SettingsViewStyle = styled.div`
  width: 100%;
  max-width: 880px;
  display: flex;
  padding-bottom: 100px;
`;

const LabelStyle = styled.label`
  display: flex;
  flex-direction: column;
`;

const LabelDivStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputStyle = styled.input`
  height: 20px;
`;

const FormStyle = styled.form`
  width: 40%;
  margin-left: 5%;
`;

class SettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  render() {
    return (
      <SettingsViewStyle>
        <SideNav />
        <FormStyle>
          <LabelStyle>
            <LabelDivStyle>
              <p>Email:</p>
              <InputStyle type="text" name="email" />
            </LabelDivStyle>
            <LabelDivStyle>
              <p>Phone:</p>
              <InputStyle type="text" name="phone" />
            </LabelDivStyle>
            <LabelDivStyle>
              <input type="checkbox" />
              <p>Emails?</p>
              <input type="checkbox" />
              <p>Texts?</p>
            </LabelDivStyle>
            <LabelDivStyle>
              <p>Old Password:</p>
              <InputStyle type="password" name="oldpassword" />
            </LabelDivStyle>
            <LabelDivStyle>
              <p>New Password:</p>
              <InputStyle type="password" name="newpassword" />
            </LabelDivStyle>
          </LabelStyle>
          <input type="submit" value="Save" />
        </FormStyle>
      </SettingsViewStyle>
    );
  }
}

export default SettingsView;
