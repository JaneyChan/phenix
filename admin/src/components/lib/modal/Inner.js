import React from 'react';
import PropTypes from 'prop-types';

export default class Inner extends React.PureComponent {
  render () {
    const { maskCloseAble, onClose, title, footer, children } = this.props;
    return (
      <React.Fragment>
        <div className="modal-mask" onClick={maskCloseAble ? onClose : undefined}></div>
        <div className="modal-panel">
          {title ? (<div className="modal-title">{title}</div>) : null}
          <div className="modal-body">{children}</div>
          {
            footer ? (
              <div className="modal-footer">{footer}</div>
            ) : null
          }
        </div>
      </React.Fragment>
    );
  }
}

Inner.propTypes = {
  maskCloseAble: PropTypes.bool // 点击遮罩层是否关闭对话框，默认为ture
};

Inner.defaultProps = {
  maskCloseAble: true
};
