export const SET_FILTER = 'SET_FILTER';
export const SET_BREAKPOINT = 'SET_BREAKPOINT';

export function setFilter(filter) {
  return { type: SET_FILTER, filter };
}

export function setBreakpoint(breakpoint) {
  return { type: SET_BREAKPOINT, breakpoint };
}
