import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import classNames from 'classnames';
import { Link } from 'gatsby';

// Redux

// Components
import BtnLink from '../Common/BtnLink/BtnLink';

// CSS, Requires
import "./Search.scss";
import { books } from '../../utils/books';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      ready: false,
      searchOptions: []
    };

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.addEventListeners();
  }

  componentDidUpdate(oldProps) {
    if (this.props.open && this.state.searchOptions.length === 0) {
      this.setState({
        searchOptions: this.createSearchOptions(this.props.people, books)
      });
    }
  }

  addEventListeners() {
    document.addEventListener('keyup', (e) => {
      if (this.isStartingKey(e.key) && !this.state.ready) {
        this.setState({
          text: this.state.text + e.key
        });

        if (!this.props.open) {
          this.props.onRequestOpen();
        }
      } else if (e.key === 'Escape' && this.state.ready && this.props.open) {
        this.props.onRequestClose();
      }
    }, false);
  }

  createSearchOptions(people, books) {
    const _people = people.edges.map(({ node }) => {
      const characters = Object.keys(node.appearances).map(key => {
        if (node.appearances[key]) {
          return {
            type: 'Character',
            label: node.appearances[key],
            slug: node.fields.slug
          };
        }

        return null;
      }).filter(v => v);

      return [
        {
          type: 'Person',
          label: node.name,
          slug: node.fields.slug
        }
      ].concat(characters);
    }).flat();

    const _uniquePeople = [];
    _people.forEach(p => {
      if (!_uniquePeople.find(_p => _p.label === p.label)) {
        _uniquePeople.push(p);
      }
    });

    const _books = Object.keys(books).map(b => {
      return {
        type: 'Book',
        label: books[b],
        slug: b
      }
    });

    const _list = _uniquePeople.concat(_books);
    _list.sort((a, b) => {
      if (a.label < b.label) {
        return -1;
      }
      if (a.label > b.label) {
        return 1;
      }

      return 0;
    });

    return _list;
  }

  isStartingKey(key) {
    return (key.length === 1 && key.match(/^[a-z0-9]+$/i));
  }

  onChange = (e) => {
    this.setState({
      text: e.target.value
    });
  }

  onFocus = () => {
    this.setState({
      focused: true
    });
  }

  onBlur = () => {
    this.setState({
      focused: false
    });
  }

  onTransitionEnd = () => {
    this.setState({
      ready: this.props.open
    });

    if (this.props.open) {
      this.inputRef.current.focus();
    } else {
      this.setState({
        text: ''
      });
    }
  }

  onResultClicked = () => {
    this.props.onRequestClose();
  }

  renderSearch = (opt, index) => {
    if (opt.type === 'Book') {
      const onClick = () => {
        this.onResultClicked();
        this.props.onSetFilter(opt.slug)
      };

      return (
        <li className="search-item" key={index}>
          <button className="search-item__link" onClick={onClick}>
            <p className="search-item__title">{ opt.label }</p>
            <p className="search-item__type">{ opt.type }</p>
          </button>
        </li>
      )
    } else {
      return (
        <li className="search-item" key={index}>
          <Link className="search-item__link" to={opt.slug} onClick={this.onResultClicked}>
            <p className="search-item__title">{ opt.label }</p>
            <p className="search-item__type">{ opt.type }</p>
          </Link>
        </li>
      )
    }
  }

  render() {
    const { className, open, onRequestClose } = this.props;
    const { text, searchOptions } = this.state;

    const cls = classNames(
      className,
      'search',
      {
        'search--open': open
      }
    );

    const filtered = searchOptions.filter(opt => {
      return opt.label.toLowerCase().includes(text.toLowerCase())
    });

    return (
      <section className={cls} onTransitionEnd={this.onTransitionEnd}>
        <h1 className="search__title">Search</h1>
        <BtnLink
          className="search__close"
          onClick={onRequestClose}>Close search</BtnLink>

        <div className="search__content">
          <div className="search__content__input-box">
            <input
              className="search__content__input"
              type="search"
              ref={this.inputRef}
              value={text}
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              placeholder="Search"/>
          </div>
          <ul className="search__content__results">
            { filtered.map(this.renderSearch) }
          </ul>
        </div>
      </section>
    );
  }
}

Search.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool
};

Search.defaultProps = {
  className: null,
  open: false
};

export default Search;
