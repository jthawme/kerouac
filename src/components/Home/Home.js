import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// 3rd Party Modules
import classNames from 'classnames';
import { bindActionCreators } from 'redux';

// Redux

// Components
import SEO from '../Common/SEO/SEO';
import CharacterTile, { SIZES } from '../CharacterTile/CharacterTile';

// CSS, Requires
import "./Home.scss";

const getPlacement = (total, span, prefix = 0) => {
  const possible = total - span;
  const rand = (Math.floor(Math.random() * possible) + 1) + prefix;
  return `${ rand } / span ${span}`;
};

export const PRIORITY = {
  LARGE: 0,
  MEDIUM: 1,
  SMALL: 2
};

class Home extends React.Component {
  constructor(props) {
    super(props);

    const { top, list } = this.getList(props.people.list, props.filter);

    this.state = {
      top,
      filter: props.filter,
      list
    };

    this.filterPeople = this.filterPeople.bind(this);
    this.renderPeople = this.renderPeople.bind(this);
    this.renderSmallPeople = this.renderSmallPeople.bind(this);
  }

  componentDidUpdate(oldProps) {
    if (oldProps.filter !== this.props.filter) {
      const { top, list } = this.getList(this.props.people.list, this.props.filter);
      this.setState({ top, list });
    }
  }

  getList(list, filter) {
    const filtered = list.filter((person) => this.filterPeople(person, filter));
    const top = filtered.reduce((prev, curr) => {
      if (curr.node.priority <= PRIORITY.MEDIUM) {
        return prev + 1;
      }

      return prev;
    }, 0);

    filtered.sort(this.orderPeople);

    return {
      top,
      list: filtered.map((person, index) => this.templatePeople(person, index, top))
    };
  }

  orderPeople(person1, person2) {
    if (person1.node.priority < person2.node.priority) {
      return -1;
    }

    if (person1.node.priority > person2.node.priority) {
      return 1;
    }

    return 0;
  }

  templatePeople(person, index, top) {
    const state = {
      ...person
    };

    if (index === 0) {
      state.gridColumn = getPlacement(12, 12);
    } else if (index < top) {
      const dt = index - top;

      if (dt % 2 === 0) {
        state.gridColumn = getPlacement(8, 8, 1)
      } else {
        state.gridColumn = getPlacement(8, 8, 3)
      }
    } else {
      const dt = index - top;

      if (dt % 2 === 0) {
        state.gridColumn = getPlacement(5, 3, 1);
      } else {
        state.gridColumn = getPlacement(7, 3, 6);
      }
    }

    state.marginTop = Math.random();

    return state;
  }

  filterPeople(person, filter) {
    return (filter in person.node.appearances && person.node.appearances[filter]);
  }

  renderPeople(person, index) {
    const size = index === 0 ? SIZES.LARGE : SIZES.MEDIUM;
    return (
      <div className={`home__person-row home__person-row--${size}`} key={person.node.id}>
        <CharacterTile
          style={{
            gridColumn: person.gridColumn,
            marginTop: `${index !== 0 ? person.marginTop * 3 : 0}rem`
          }}
          size={size}
          filter={this.props.filter}
          alt={index % 2 !== 0}
          {...person.node}/>
      </div>
    );
  }

  renderSmallPeople(person, index) {
    const { list, top } = this.state;
    const next = top + index + 1;

    if (index % 2 === 1) {
      return null;
    }

    return (
      <div className="home__person-row home__person-row--small" key={person.node.id}>
        <CharacterTile
          style={{
            gridColumn: person.gridColumn,
            marginTop: `${person.marginTop * 8}rem`
          }}
          {...person.node}
          filter={this.props.filter}/>
        {
          next < list.length ? (
            <CharacterTile
              style={{
                gridColumn: list[next].gridColumn,
                marginTop: `${list[next].marginTop * 8}rem`
              }}
              {...list[next].node}
              filter={this.props.filter}/>
          ) : null
        }
      </div>
    );
  }

  render() {
    const { className } = this.props;
    const { top, list } = this.state;

    const cls = classNames(
      className,
      'home'
    );

    return (
      <div className={cls}>
        <SEO/>
        { list.slice(0, top).map(this.renderPeople) }
        { list.slice(top).map(this.renderSmallPeople) }
      </div>
    );
  }
}

Home.propTypes = {
  className: PropTypes.string,
  persons: PropTypes.array.isRequired
};

Home.defaultProps = {
  className: null,
  persons: []
};

const mapStateToProps = (store) => {
  return {
    filter: store.app.filter
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
