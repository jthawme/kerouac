import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// 3rd Party Modules
import { bindActionCreators } from 'redux';

// Redux
import { setBreakpoint } from '../../../state/actions/app';

// Components
import { getBreakpoint } from '../../../utils/breakpoints';

// CSS, Requires

let ticking = false;

class BreakpointCheck extends React.Component {
  constructor(props) {
    super(props);

    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize, false);
  }

  onResize() {
    this.requestTick();
  }

  requestTick() {
    if (!ticking) {
      requestAnimationFrame(this.update);
      ticking = true;
    }
  }

  update = () => {
    const breakpoint = getBreakpoint();
    this.props.setBreakpoint(breakpoint);
    ticking = false;
  }

  render() {
    return null;
  }
}

BreakpointCheck.propTypes = {
  className: PropTypes.string
};

BreakpointCheck.defaultProps = {
  className: null
};

const mapStateToProps = (store) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setBreakpoint
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BreakpointCheck);
