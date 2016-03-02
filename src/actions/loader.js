export const LOADING = '@@Loader/loading';
export const LOADED = '@@Loader/loaded';

export const loading = (...names) => ({
  type: LOADING,
  names,
});

export const loaded = (...names) => ({
  type: LOADED,
  names,
});
