import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'underscore.lifted';

/**
 * Simple loading component to display a spinning loader while the
 * loading property remains true.
 */

class Loader extends Component {
  static propTypes = {
    children: PropTypes.object,
    className: PropTypes.string,
    text: PropTypes.string,
    name: PropTypes.string,
    loadingNames: PropTypes.array,
    initialHeight: PropTypes.number,
  };

  static defaultProps = {
    text: 'Loading...',
    loadingNames: [],
    initialHeight: 200,
  };


  isLoading = (props = this.props) => {
    const {name, loadingNames} = props;
    return _(loadingNames).contains(name);
  };

  render() {
    const {props} = this;
    const {children, className, name, loadingNames, text, initialHeight} = props;
    const loading = _(loadingNames).contains(name);

    const dimmerState = loading ? 'active' : 'disabled';
    const height = loading ? initialHeight : undefined;

    return (
      <div className={className} style={{height}}>
        <div className={`ui ${dimmerState} large dimmer`}>
          <div className="ui text loader">
            <p>{text}</p>
          </div>
        </div>
        {children}
      </div>
    );
  }
}

export default connect(
  ({loaderReducer = {}}) => ({
    loadingNames: loaderReducer.names,
  }),
  null
)(Loader);
