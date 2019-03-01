import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import classNames from 'classnames';

// Components
import { PRIORITY } from '../HomeTiles';

// CSS, Requires
import styles from "./Tile.module.scss";

const PRIORITYCLS = ['large', 'medium', 'small'];

const getRandom = (min, max) => {
  return Math.round((Math.random() * (max - min))) + min;
};

export const getColumnStyle = (priority) => {
  switch (priority) {
    case PRIORITY.LARGE:
      return {
        '--column-start': 1,
        '--column-span': 12,
        '--column-margin': (getRandom(1, 10) / 10),
        '--column-mobile-start': 1,
        '--column-mobile-span': 6
      };
    case PRIORITY.MEDIUM:
      return {
        '--column-start': getRandom(1, 3),
        '--column-span': 8,
        '--column-margin': (getRandom(1, 10) / 10),
        '--column-mobile-start': 1,
        '--column-mobile-span': 6,
        '--parallax-random': (getRandom(1, 10) / 10),
      };
    case PRIORITY.SMALL:
    default:
      return {
        '--column-start': getRandom(1, 3),
        '--column-span': 3,
        '--column-margin': (getRandom(1, 10) / 10),
        '--column-phablet-start': getRandom(1, 2),
        '--column-phablet-span': 2,
        '--column-mobile-start': getRandom(1, 3),
        '--column-mobile-span': 3,
        '--parallax-random': (getRandom(1, 10) / 10),
      };
  }
};

class Tile extends React.Component {
  render() {
    const { className, media, displayName, name, slug, priority, style } = this.props;

    const cls = classNames(
      styles.root,
      styles[PRIORITYCLS[priority]],
      className
    );

    const { name: imageAlt, image } = media.node;

    return (
      <div className={ cls } style={ style }>
        <Link to={slug} className={styles.image}>
          <Img backgroundColor="#000" {...image.large} alt={ imageAlt }/>
        </Link>
        <div className={ styles.text }>
          <Link to={slug} className={ styles.displayName }>{ displayName }</Link>
          { name ? <Link to={slug} className={ styles.name }>{ name }</Link> : null }
        </div>
      </div>
    );
  }
}

Tile.propTypes = {
  className: PropTypes.string,
}

Tile.defaultProps = {
  className: null,
}

export default Tile;
