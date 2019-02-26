export const getCurrentName = (obj, filter, fallback) => {
  return (filter in obj) ? obj[filter] : fallback;
};
