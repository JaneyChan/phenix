import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import Modal from './Modal';

class Dialog extends PureComponent {
  render () {
    let { visible } = this.props;
    if (visible) {
      return createPortal(
        <Modal {...this.props} />,
        document.body
      );
    }
    return null;
  }
}

export default Dialog;
