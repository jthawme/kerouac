import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules

// Components

// CSS, Requires
import "./Home.scss";

const Home = ({ className }) => (
    <div className={`home ${className}`}>home</div>
);

Home.propTypes = {
  className: PropTypes.string,
}

Home.defaultProps = {
  className: null,
}

export default Home;
