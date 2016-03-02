import transact from 'redux-transact';
import * as loaderActions from './loader';

export default (route, handler, name) => (dispatch) => {
  const loadedHandler = (result) => (dispatch2) => {
    dispatch2(handler(result));
    dispatch2(loaderActions.loaded(name));
  };

  dispatch(loaderActions.loading(name));
  dispatch(transact(route, loadedHandler));
};
