import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// 3rd Party Modules
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import 'focus-visible';

// Redux
import { setFilter } from '../../../state/actions/app';

// Components
import BtnLink from '../BtnLink/BtnLink';
import BookSelector from '../BookSelector/BookSelector';
import Search from '../../Search/Search';
import FilterCheck from '../FilterCheck/FilterCheck';

// CSS, Requires
import "./Layout.scss";
import { StaticQuery, graphql } from 'gatsby';

const TOP_THRESHOLD = 100;

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      top: true,
      searchBox: false
    };

    this.onScroll = this.onScroll.bind(this);
    this.scrollY = 0;
    this.ticking = false;
  }

  componentDidMount() {
    this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener('scroll', this.onScroll, {
      passive: true
    });
  }

  onScroll() {
    this.scrollY = window.scrollY;
    this.requestTick();
  }

  checkTop() {
    this.setState({
      top: (this.scrollY < TOP_THRESHOLD)
    }, () => {
      this.ticking = false;
    });
  }

  requestTick() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => this.checkTop());
      this.ticking = true;
    }
  };

  getLink(path) {
    switch (path) {
      case 'about':
        return {
          href: '/',
          text: 'Home'
        };
      default:
        return {
          href: '/about',
          text: 'About'
        };
    }
  }

  onRequestSearchOpen = () => {
    this.setState({
      searchBox: true
    });
  }

  onRequestSearchClose = () => {
    this.setState({
      searchBox: false
    });
  }

  render() {
    const { children, filter } = this.props;
    const { top, searchBox } = this.state;

    const cls = classNames(
      'layout',
      {
        'layout--not-top': !top
      }
    );

    const { href, text } = this.getLink(this.props['*']);

    return (
      <div className={cls}>
        <FilterCheck filter={ filter }/>

        <BtnLink
          className="layout__search"
          onClick={this.onRequestSearchOpen}>
          Type to search...
        </BtnLink>

        <BtnLink to="/" className="layout__logo">Friends of Kerouac</BtnLink>

        <BookSelector
          className="layout__selector"/>

        <BtnLink
          className="layout__link"
          to={ href }>
          { text }
        </BtnLink>

        <StaticQuery
          query={graphql`
            {
              people: allPersonYaml {
                edges {
                  node {
                    id,
                    name,
                    appearances {
                      on_the_road
                      the_subterraneans
                      desolation_angels
                      the_town_and_the_city
                      vanity_of_duluoz
                      visions_of_cody
                      the_dharma_bums
                      big_sur
                      visions_of_gerard
                      doctor_sax
                      maggie_cassidy
                      tristessa
                      satori_in_paris
                      the_subterranean
                    }
                    fields {
                      slug
                    }
                  }
                }
              }
            }
          `}
          render={({ people }) => (
            <Search
              people={people}
              open={searchBox}
              onRequestOpen={this.onRequestSearchOpen}
              onRequestClose={this.onRequestSearchClose}
              onSetFilter={this.props.setFilter}
              className="layout__search-box"/>
          )}
        />

        { children }
      </div>
    );
  }
}

Layout.propTypes = {
  className: PropTypes.string
};

Layout.defaultProps = {
  className: null
};

const mapStateToProps = (store) => {
  return {
    filter: store.app.filter
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setFilter
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
