export const BREAKPOINTS = {
  MOBILEUP: 320,
  PHABLET: 480,
  TABLET: 768,
  LAPTOP: 950,
  DESKTOP: 1280,
};

export const getBreakpoint = () => {
  if (typeof window === 'undefined') {
    return -1;
  }

  let largest;
  const keys = Object.keys(BREAKPOINTS);

  for (let k = 0; k < keys.length; k++) {
    let bp = BREAKPOINTS[keys[k]];

    if (window.matchMedia(`(min-width: ${bp}px)`).matches) {
      largest = keys[k];
    } else {
      break;
    }
  }

  return BREAKPOINTS[largest];
}
