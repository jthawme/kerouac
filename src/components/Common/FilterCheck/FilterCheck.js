import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import { navigate } from 'gatsby';

// Redux

// Components

// CSS, Requires

class FilterCheck extends React.Component {
  componentDidUpdate(oldProps) {
    if (oldProps.filter !== this.props.filter) {
      this.updateFilter(this.props.filter);
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.filter !== this.props.filter;
  }

  updateFilter(filter) {
    const target = `/#${filter}`;
    if (window.location.pathname !== '/') {
      navigate(target);
    } else {
      window.history.replaceState({}, null, target);
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
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
