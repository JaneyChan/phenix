import { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Portal extends Component {
  constructor (props) {
    super(props);
    this.el = document.createElement('div');
    this.el.className = 'portal';
    document.body.appendChild(this.el);
  }

  componentWillUnmount () {
    this.removePortal();
  }

  removePortal () {
    document.body.removeChild(this.el);
  }

  render () {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
