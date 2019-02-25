import { SET_FILTER, SET_BREAKPOINT } from '../actions/app';
import { books } from '../../utils/books';
import { getBreakpoint } from '../../utils/breakpoints';

function getInitialFilter(def = 'on_the_road') {
  if (typeof window === 'undefined' || !window.location.hash) {
    return def;
  }

  const hash = window.location.hash.substring(1);

  if (Object.keys(books).indexOf(hash) >= 0) {
    return hash;
  }

  return def;
}

const initialState = {
  filter: getInitialFilter(),
  breakpoint: getBreakpoint()
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    case SET_BREAKPOINT:
      return {
        ...state,
        breakpoint: action.breakpoint
      };
    default:
      return state;
  }
}
