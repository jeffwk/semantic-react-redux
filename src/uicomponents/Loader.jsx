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
    height: PropTypes.number,
    defaultHeight: PropTypes.number,
  };

  static defaultProps = {
    text: 'Loading...',
    loadingNames: [],
    defaultHeight: 200,
  };

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidUpdate() {
    if (!this.state.loaded && !this.isLoading()) {
      this.loadedOnce();
    }
  }

  loadedOnce() {
    this.setState({loaded: true});
  }

  isLoading = (props = this.props) => {
    const {name, loadingNames} = props;
    return _(loadingNames).contains(name);
  };

  render() {
    const {props} = this;
    const {children, className, defaultHeight, text, height} = props;

    const style = {
      height: (
        _.lift(height)
        .orElse(() => (
          _.lift(this.state.loaded)
          .map(() => '100%')
          .orElse(() => defaultHeight)
          .unlift()
        ))
        .unlift()
      ),
    };

    const dimmerState = this.isLoading() ? 'active' : 'disabled';

    return (
      <div className={className} style={style}>
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
