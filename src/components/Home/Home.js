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
import { BREAKPOINTS } from '../../utils/breakpoints';

/**
 * Generates a grid css value
 *
 * @param {Number} total The total number of columns it can inhabit
 * @param {Number} span The span of the element
 * @param {Number} prefix Push the column initially
 */
const getPlacement = (total, span, prefix = 0) => {
  const possible = total - span;
  const rand = (Math.floor(Math.random() * possible) + 1) + prefix;
  return `${ rand } / span ${span}`;
};

// Struct to help out with the ordering
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
    // Checks if the filter changes to rebuild the list
    if (oldProps.filter !== this.props.filter) {
      const { top, list } = this.getList(this.props.people.list, this.props.filter);
      this.setState({ top, list });
    }
  }


  /**
   * Gets the newly formed list of people and their
   * presentational elements and ordered
   *
   * @param {Array} list List of people
   * @param {String} filter Book string
   */
  getList(list, filter) {
    const filtered = list.filter((person) => this.filterPeople(person, filter));

    // Needs to work out how many 'top' placed people there are
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


  /**
   * Orders based on assigned priority
   *
   * @param {Object} person1
   * @param {Object} person2
   */
  orderPeople(person1, person2) {
    if (person1.node.priority < person2.node.priority) {
      return -1;
    }

    if (person1.node.priority > person2.node.priority) {
      return 1;
    }

    return 0;
  }


  /**
   * Adds fixed presentational elements to the characters
   *
   * @param {Object} person
   * @param {Number} index
   * @param {Number} top
   */
  templatePeople(person, index, top) {
    const state = {
      ...person
    };

    // If its the first (jack) its full width
    if (index === 0) {
      state.gridColumn = getPlacement(12, 12);
    } else if (index < top) {
      // If its a medium/top range alternate its side
      const dt = index - top;

      if (dt % 2 === 0) {
        state.gridColumn = getPlacement(8, 8, 1)
      } else {
        state.gridColumn = getPlacement(8, 8, 3)
      }
    } else {
      // Small characters just alternate going down
      const dt = index - top;

      if (dt % 2 === 0) {
        state.gridColumn = getPlacement(5, 3, 1);
        state.gridColumnMobile = getPlacement(3, 2, 1);
      } else {
        state.gridColumn = getPlacement(7, 3, 6);
        state.gridColumnMobile = getPlacement(4, 2, 3);
      }
    }

    // Grab a 0-1 for margin top
    state.marginTop = Math.random();

    return state;
  }


  /**
   * Filters if they appear in the current filter
   * @param {Object} person
   * @param {String} filter
   */
  filterPeople(person, filter) {
    return (filter in person.node.appearances && person.node.appearances[filter]);
  }


  /**
   * Renders any character single column in the 'top' section
   *
   * @param {Object} person
   * @param {Number} index
   */
  renderPeople(person, index) {
    const size = index === 0 ? SIZES.LARGE : SIZES.MEDIUM;

    const style = {};

    if (this.props.breakpoint >= BREAKPOINTS.TABLET) {
      style.gridColumn = person.gridColumn;
      style.marginTop = `${index !== 0 ? person.marginTop * 3 : 0}rem`;
    }

    return (
      <div className={`home__person-row home__person-row--${size}`} key={person.node.id}>
        <CharacterTile
          style={style}
          size={size}
          filter={this.props.filter}
          alt={index % 2 !== 0}
          {...person.node}/>
      </div>
    );
  }


  /**
   * Renders the multi column 'small' characters
   *
   * @param {Object} person
   * @param {Number} index
   */
  renderSmallPeople(person, index) {
    const { list, top } = this.state;
    const next = top + index + 1;

    if (index % 2 === 1) {
      return null;
    }

    const style = {};
    const styleNext = {};

    if (this.props.breakpoint >= BREAKPOINTS.TABLET) {
      style.gridColumn = person.gridColumn;
      style.marginTop = `${index !== 0 ? person.marginTop * 3 : 0}rem`;

      if (next < list.length) {
        styleNext.gridColumn = list[next].gridColumn;
        styleNext.marginTop = `${list[next].marginTop * 8}rem`;
      }
    } else {
      style.gridColumn = person.gridColumnMobile;
      style.marginTop = `${index !== 0 ? person.marginTop * 3 : 0}rem`;

      if (next < list.length) {
        styleNext.gridColumn = list[next].gridColumnMobile;
        styleNext.marginTop = `${list[next].marginTop * 8}rem`;
      }
    }

    return (
      <div className="home__person-row home__person-row--small" key={person.node.id}>
        <CharacterTile
          style={style}
          {...person.node}
          filter={this.props.filter}/>
        {
          next < list.length ? (
            <CharacterTile
              style={styleNext}
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
    filter: store.app.filter,
    breakpoint: store.app.breakpoint
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
