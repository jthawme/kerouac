import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import classNames from 'classnames';

// Components
import { Link } from 'gatsby';

// CSS, Requires
import "./BtnLink.scss";

const BtnLink = ({ className, children, to, ...props }) => {
  const cls = classNames(
    className,
    'btnlink',
    {
      'btnlink--button': !to
    }
  );

  const attrs = {
    className: cls,
    ...props
  };

  if (to) {
    return <Link to={to} {...attrs}>{ children }</Link>
  } else {
    return <button {...attrs}>{ children }</button>;
  }
};

BtnLink.propTypes = {
  className: PropTypes.string,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  children: PropTypes.node,
}

BtnLink.defaultProps = {
  className: null,
  to: false,
}

export default React.memo(BtnLink);
