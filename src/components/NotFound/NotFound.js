import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules

// Components

// CSS, Requires
import "./NotFound.scss";

const NotFound = ({ className }) => (
    <div className={`notfound ${className}`}>404 Not found</div>
);

NotFound.propTypes = {
  className: PropTypes.string,
}

NotFound.defaultProps = {
  className: null,
}

export default NotFound;
