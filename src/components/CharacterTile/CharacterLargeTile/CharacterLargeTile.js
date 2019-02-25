import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import { Link } from 'gatsby';

// Components

// CSS, Requires
import styles from "./CharacterLargeTile.module.scss";

const CharacterLargeTile = ({ className, image, displayName, name, alt, slug, style }) => (
    <div className={`${className} ${styles.root} ${alt ? styles.alt : ''}`} style={ style }>
      <Link to={ slug } className={styles.text}>
        <p className={styles.title}>{ displayName }</p>
        { displayName ? <p className={styles.subtitle}>{ name }</p> : null }
      </Link>
      <Link to={ slug } className={styles.image}>
        { image }
      </Link>
    </div>
);

CharacterLargeTile.propTypes = {
  className: PropTypes.string,
}

CharacterLargeTile.defaultProps = {
  className: null,
}

export default CharacterLargeTile;
