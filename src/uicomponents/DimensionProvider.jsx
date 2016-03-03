import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore.lifted';

export default class extends Component {
  static propTypes = {
    children: PropTypes.object,
    height: PropTypes.number,
    width: PropTypes.number,
    h: PropTypes.bool,
    w: PropTypes.bool
  };

  static defaultProps = {
    width: 500,
    height: 500,
    h: false,
    w: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      ...(_.pick(props, 'width', 'height')),
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

    const update = {
      height: this.props.h ? height : undefined,
      width: this.props.w ? width : undefined,
    };

    this.setState({
      ...update,
      resizing: undefined,
    });
  };

  render() {
    const {props} = this;
    const {children} = props;

    const {width, height} = this.state;

    return React.cloneElement(children, {width, height});
  }
}
