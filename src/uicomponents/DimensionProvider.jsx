import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class extends Component {
  static propTypes = {
    children: PropTypes.object,
    initHeight: PropTypes.number,
    initWidth: PropTypes.number,
  };

  static defaultProps = {
    initWidth: 500,
    initHeight: 500,
  };

  constructor(props) {
    super(props);
    this.state = {
      width: props.initWidth,
      height: props.initHeight,
      resizing: undefined,
    };
  }

  componentDidMount() {
    this.updateBoundingBox();
    window.addEventListener('resize', () => {
      clearTimeout(this.state.resizing);
      this.setState({
        resizing: setTimeout(this.updateBoundingBox, 500),
      });
    });
  }

  updateBoundingBox = () => {
    const root = ReactDOM.findDOMNode(this);
    const {left, right, top, bottom} = root.getBoundingClientRect();
    const width = right - left;
    const height = bottom - top;

    this.setState({
      width,
      height,
      resizing: undefined,
    });
  }

  render() {
    const {props} = this;
    const {children} = props;

    const {width, height} = this.state;

    return React.cloneElement(children, {width, height});
  }
}
