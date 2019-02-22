import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import { Link } from 'gatsby';

// Components

// CSS, Requires
import styles from "./CharacterLargeTile.module.scss";

const CharacterLargeTile = ({ className, image, displayName, name, alt, style, slug }) => (
    <Link to={ slug } className={`${className} ${styles.root} ${alt ? styles.alt : ''}`} style={style}>
      <div className={styles.text}>
        <p className={styles.title}>{ displayName }</p>
        { displayName ? <p className={styles.subtitle}>{ name }</p> : null }
      </div>
      <div className={styles.image}>
        { image }
      </div>
    </Link>
);

CharacterLargeTile.propTypes = {
  className: PropTypes.string,
}

CharacterLargeTile.defaultProps = {
  className: null,
}

export default CharacterLargeTile;
