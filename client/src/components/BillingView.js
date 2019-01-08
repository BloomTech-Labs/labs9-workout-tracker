import React from "react";
import SideNav from "./SideNav";

class BillingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        BillingView
        <SideNav />
      </div>
    );
  }
}

export default BillingView;
