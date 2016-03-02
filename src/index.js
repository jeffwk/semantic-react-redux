import Loader from './uicomponents/Loader';
import DimensionProvider from './uicomponents/DimensionProvider';
import loaderReducer from './reducers/loader';
import * as loaderActions from './actions/loader';
import loadingTransact from './actions/loading-transact';

export default Loader;

export {
  Loader,
  DimensionProvider,
  loaderReducer,
  loaderActions,
  loadingTransact,
};
