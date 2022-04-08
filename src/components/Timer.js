import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timerFinished } from '../redux/actions/index';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate() {
    const { getTimer } = this.props;
    // const { timer } = this.state;
    if (getTimer) { getTimer(this.state); }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  timer = () => {
    const oneSecond = 1000;
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer === 0
        ? 0 : prevState.timer - 1 }), () => {
        const { timer } = this.state;
        const { dispatchTimer } = this.props;
        if (timer === 0) { dispatchTimer(); }
      });
    }, oneSecond);
  }

  render() {
    const { timer } = this.state;
    return (
      <p>{ timer }</p>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchTimer: () => dispatch(timerFinished()),
});

Timer.propTypes = ({
  dispatchTimer: PropTypes.func.isRequired,
  getTimer: PropTypes.func.isRequired,
});

export default connect(null, mapDispatchToProps)(Timer);
