
import {loaderActions} from '..';
import _ from 'underscore.lifted';

export default (state = {}, {type, ...action}) => {
  switch (type) {
    case loaderActions.LOADING: {
      return _({}).extend(state, {
        names: _.union(state.names, action.names),
      });
    }

    case loaderActions.LOADED: {
      return _({}).extend(state, {
        names: _.difference(state.names, action.names),
      });
    }

    default: {
      return state;
    }
  }
};
