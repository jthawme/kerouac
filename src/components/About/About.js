import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules

// Components

// CSS, Requires
import "./About.scss";

const About = ({ className }) => (
    <div className={`about ${className}`}>about</div>
);

About.propTypes = {
  className: PropTypes.string,
}

About.defaultProps = {
  className: null,
}

export default About;
