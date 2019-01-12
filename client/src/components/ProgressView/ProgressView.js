import React from "react";
import SubmitProgress from "./SubmitProgress";
import ProgressTracker from "./ProgressTracker";
import ProgressList from "./ProgressList/ProgressList";
import { ProgressViewStyle } from './ProgressStyle';

class ProgressView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metrics: []
    };
  }

  componentDidMount() {
    this.setState({
      metrics: this.props.metrics
    });
  }

  render() {
    return (
      <ProgressViewStyle>
        <SubmitProgress user={this.props.user} />
        <div>
          <ProgressTracker metrics={this.props.user.metrics} />
          <ProgressList metrics={this.props.user.metrics} />
        </div>
      </ProgressViewStyle>
    );
  }
}

export default ProgressView;
