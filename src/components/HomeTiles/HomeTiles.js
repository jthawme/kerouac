import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import classNames from 'classnames';
import { TransitionGroup, Transition } from 'react-transition-group';

// Redux

// Components
import Tile, { getColumnStyle } from './Tile/Tile';

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
    filter: false,
    loaded: []
  }

  componentDidMount() {
    this.populateList(this.props.list, this.props.filter, this.startLoading);
  }

  componentDidUpdate() {
    if (this.state.filter !== this.props.filter && isArrayDiff(this.state.list, this.props.list)) {
      this.populateList(this.props.list, this.props.filter, this.startLoading);
    }
  }

  populateList(list, filter, cb = () => {}) {
    const _list = list.map(l => {
      const { appearances, fields, media, id, name, priority } = l.node;
      const displayName = getCurrentName(appearances, filter, name);

      return {
        id,
        displayName,
        name: displayName !== name ? name : false,
        slug: fields.slug,
        media,
        priority,
        style: getColumnStyle(priority)
      };
    });

    this.setState({
      list: _list,
      filter,
      loaded: []
    }, () => {
      cb();
    });
  }

  startLoading = () => {
    clearTimeout(this.timer);
    this.updateLoading();
  }

  getRandomUnloadedId() {
    const index = Math.floor(Math.random() * this.state.list.length);

    if (this.state.loaded.indexOf(this.state.list[index].id) >= 0) {
      return this.getRandomUnloadedId();
    } else {
      return this.state.list[index].id;
    }
  }

  updateLoading = () => {
    if (this.state.loaded.length === this.state.list.length) {
      this.stopLoading();
    } else {
      const randomId = this.getRandomUnloadedId();
      const loaded = this.state.loaded.slice();
      loaded.push(randomId);

      this.setState({
        loaded
      }, () => {
        const t = Math.random() * 250;
        this.timer = setTimeout(this.updateLoading, t);
      });
    }
  }

  stopLoading = () => {
    clearTimeout(this.timer);
  }

  renderTile = (tile, index) => {
    return (
      <Transition
        timeout={500}
        key={tile.id}>
        <Tile key={ tile.id } index={ index } {...tile}/>
      </Transition>
    );
  }

  render() {
    const { className } = this.props;
    const { list } = this.state;

    const cls = classNames(
      className,
      styles.root
    );

    if (list.length === 0) {
      return <TextTiles list={ this.props.list } filter={ this.props.filter }/>;
    }

    return (
      <TransitionGroup className={cls}>
        {list.map(this.renderTile)}
      </TransitionGroup>
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
