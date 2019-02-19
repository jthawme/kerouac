import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules

// Components

// CSS, Requires
SCSS

const NAME = ({ className }) => (
    <div className={`LOWER ${className}`}>LOWER</div>
);

NAME.propTypes = {
  className: PropTypes.string,
}

NAME.defaultProps = {
  className: null,
}

export default NAME;
