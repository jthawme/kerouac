import { SET_FILTER } from '../actions/app';

const initialState = {
  filter: 'on_the_road'
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    default:
      return state;
  }
}
