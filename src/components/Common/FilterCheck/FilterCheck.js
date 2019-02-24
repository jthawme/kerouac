import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import { navigate } from 'gatsby';

// Redux

// Components

// CSS, Requires

class FilterCheck extends React.Component {
  componentDidUpdate(oldProps) {
    console.log(this.props.filter);
    if (oldProps.filter !== this.props.filter) {
      this.updateFilter(this.props.filter);
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.filter !== this.props.filter;
  }

  updateFilter(filter) {
    navigate(`/#${filter}`);
  }

  render() {
    return null;
  }
}

FilterCheck.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.string
};

FilterCheck.defaultProps = {
  className: null
};

export default FilterCheck;
