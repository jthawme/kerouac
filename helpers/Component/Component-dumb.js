import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import classNames from 'classnames';

// Redux

// Components

// CSS, Requires
SCSS

class NAME extends React.Component {
  render() {
    const { className } = this.props;

    const cls = classNames(
      className,
      'LOWER'
    );

    return (
      <div className={cls}>
        NAME
      </div>
    );
  }
}

NAME.propTypes = {
  className: PropTypes.string
};

NAME.defaultProps = {
  className: null
};

export default NAME;
