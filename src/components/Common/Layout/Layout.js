import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// 3rd Party Modules
import classNames from 'classnames';
import { bindActionCreators } from 'redux';

// Redux

// Components

// CSS, Requires
import "./Layout.scss";

class Layout extends React.Component {
  render() {
    const { children } = this.props;

    const cls = classNames(
      'layout'
    );

    return (
      <div className={cls}>
        { children }
      </div>
    );
  }
}

Layout.propTypes = {
  className: PropTypes.string
};

Layout.defaultProps = {
  className: null
};

const mapStateToProps = (store) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
