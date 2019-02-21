import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// 3rd Party Modules
import classNames from 'classnames';
import { bindActionCreators } from 'redux';

// Redux

// Components

// CSS, Requires
import "./Person.scss";

class Person extends React.Component {
  render() {
    const { className } = this.props;

    console.log(this.props);

    const cls = classNames(
      className,
      'person'
    );

    return (
      <div className={cls}>
        Person
      </div>
    );
  }
}

Person.propTypes = {
  className: PropTypes.string
};

Person.defaultProps = {
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
)(Person);
