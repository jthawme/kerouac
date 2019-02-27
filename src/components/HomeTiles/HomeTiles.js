import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import classNames from 'classnames';

// Redux

// Components
import Tile from './Tile/Tile';

// CSS, Requires
import { getCurrentName } from '../../utils/names';
import styles from "./HomeTiles.module.scss";

// Struct to help out with the ordering
export const PRIORITY = {
  LARGE: 0,
  MEDIUM: 1,
  SMALL: 2
};

function TextTiles({ list, filter }) {
  return (
    <div className={styles.textOnly}>
      {
        list.map((t, i) => {
          const { id, fields, appearances, name } = t.node;
          const displayName = getCurrentName(appearances, filter, name);
          return (
            <a href={ fields.slug } key={ id }>
              <p>{ displayName }</p>
              { displayName !== name ? <p>{ name }</p> : null }
            </a>
          );
        })
      }
    </div>
  );
}

function isArrayDiff(stateList, propsList) {
  if (stateList.length !== propsList.length) {
    return true;
  }

  for (var i = 0; i < stateList.length; i++) {
    if (stateList[i].id !== propsList[i].node.id) {
      return true;
    }
  }

  return false;
}

class HomeTiles extends React.Component {
  state = {
    list: [],
    filter: false
  }

  componentDidMount() {
    this.populateList(this.props.list, this.props.filter);
  }

  componentDidUpdate() {
    if (this.state.filter !== this.props.filter && isArrayDiff(this.state.list, this.props.list)) {
      this.populateList(this.props.list, this.props.filter);
    }
  }

  populateList(list, filter) {
    const _list = list.map(l => {
      const { appearances, fields, media, id, name, priority } = l.node;
      const displayName = getCurrentName(appearances, filter, name);

      return {
        id,
        displayName,
        name: displayName !== name ? name : false,
        slug: fields.slug,
        media,
        priority
      };
    });

    this.setState({
      list: _list,
      filter
    });
  }

  renderTile = (tile, index) => {
    return <Tile key={ tile.id } index={ index } {...tile}/>
  }

  render() {
    const { className } = this.props;
    const { list } = this.state;

    const cls = classNames(
      className,
      styles.root
    );

    return (
      <div className={cls}>
        { list.length === 0 ? <TextTiles list={ this.props.list } filter={ this.props.filter }/> : list.map(this.renderTile) }
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
