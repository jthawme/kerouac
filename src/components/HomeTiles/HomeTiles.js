import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import classNames from 'classnames';

// Redux

// Components

// CSS, Requires
import "./HomeTiles.scss";

class HomeTiles extends React.Component {
  render() {
    const { className } = this.props;

    const cls = classNames(
      className,
      'hometiles'
    );

    return (
      <div className={cls}>
        HomeTiles
      </div>
    );
  }
}

HomeTiles.propTypes = {
  className: PropTypes.string
};

HomeTiles.defaultProps = {
  className: null
};

export default HomeTiles;
