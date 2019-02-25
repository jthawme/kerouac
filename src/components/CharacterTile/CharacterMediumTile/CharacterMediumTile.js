import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import { Link } from 'gatsby';

// Components

// CSS, Requires
import styles from "./CharacterMediumTile.module.scss";

const CharacterMediumTile = ({ className, image, displayName, name, alt, slug, style }) => {
  console.log(style);
  return (
    <div className={`${className} ${styles.root} ${alt ? styles.alt : ''}`} style={style}>
      <Link to={ slug } className={styles.text}>
        <p className={styles.title}>{ displayName }</p>
        { displayName ? <p className={styles.subtitle}>{ name }</p> : null }
      </Link>
      <Link to={ slug } className={styles.image}>
        { image }
      </Link>
    </div>
  );
}

CharacterMediumTile.propTypes = {
  className: PropTypes.string,
}

CharacterMediumTile.defaultProps = {
  className: null,
}

export default CharacterMediumTile;
