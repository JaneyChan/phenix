import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Dialog extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    open: PropTypes.bool
  }
  static defaultProps = {
    open: false
  }
  render () {
    let { open, className } = this.props;
    const classString = classNames(
      className,
      {
        'dialog-wrap': true
      }
    );
    if (open) {
      return createPortal(
        <div className="dialog-overlay">
          <div className={classString}>{this.props.children}</div>
        </div>,
        document.body
      );
    }
    return null;
  }
}

export default Dialog;
