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

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: props.filter,
      list: this.getList(props.people.list, props.filter)
    };
  }

  componentDidUpdate(oldProps) {
    // Checks if the filter changes to rebuild the list
    if (oldProps.filter !== this.props.filter) {
      this.setState({
        list: this.getList(this.props.people.list, this.props.filter)
      });
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

    filtered.sort(this.orderPeople);

    return filtered;
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
    const { className, filter } = this.props;
    const { list } = this.state;

    const cls = classNames(
      className,
      'home'
    );

    return (
      <div className={cls}>
        <SEO/>

        <HomeTiles
          list={ list }
          filter={ filter }/>
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
