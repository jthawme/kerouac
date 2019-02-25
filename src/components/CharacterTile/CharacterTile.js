import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import Img from "gatsby-image";

// Components

// CSS, Requires
import CharacterSmallTile from './CharacterSmallTile/CharacterSmallTile';
import CharacterMediumTile from './CharacterMediumTile/CharacterMediumTile';
import CharacterLargeTile from './CharacterLargeTile/CharacterLargeTile';

export const SIZES = {
  LARGE: 'large',
  MEDIUM: 'medium',
  SMALL: 'small',
};

const getImage = (imageObj, size) => {
  if (size === SIZES.LARGE) {
    return imageObj.large;
  } else {
    return imageObj.medium;
  }
}

const getCurrentName = (obj, filter, fallback) => {
  return (filter in obj) ? obj[filter] : fallback;
};

const CharacterTile = ({ className, size, image, name, filter, appearances, alt, fields, style }) => {
  const img = <Img backgroundColor={'#000'} {...getImage(image, size)}/>;

  if (size === SIZES.SMALL) {
    return (
      <CharacterSmallTile
        alt={alt}
        displayName={ getCurrentName(appearances, filter, name) }
        name={ name }
        image={ img }
        style={ style }
        {...fields}/>
    );
  }

  if (size === SIZES.MEDIUM) {
    return (
      <CharacterMediumTile
        alt={alt}
        displayName={ getCurrentName(appearances, filter, name) }
        name={ name }
        image={ img }
        style={ style }
        {...fields}/>
    );
  }

  if (size === SIZES.LARGE) {
    return (
      <CharacterLargeTile
        alt={alt}
        displayName={ getCurrentName(appearances, filter, name) }
        name={ name }
        image={ img }
        style={ style }
        {...fields}/>
    );
  }

  return null;
};

CharacterTile.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.values(SIZES)),
  alt: PropTypes.bool
}

CharacterTile.defaultProps = {
  className: null,
  size: SIZES.SMALL,
  alt: false
}

export default React.memo(CharacterTile);
