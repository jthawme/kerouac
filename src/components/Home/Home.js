import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// 3rd Party Modules
import classNames from 'classnames';
import { bindActionCreators } from 'redux';

// Redux

// Components
import SEO from '../Common/SEO/SEO';
import HomeTiles from '../HomeTiles/HomeTiles';

// CSS, Requires
import "./Home.scss";

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
      list: filtered
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
   * Filters if they appear in the current filter
   * @param {Object} person
   * @param {String} filter
   */
  filterPeople = (person, filter) => {
    return (filter in person.node.appearances && person.node.appearances[filter]);
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

        <HomeTiles
          list={ list }
          top={ top }/>
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
