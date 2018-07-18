import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Icon } from '@/components/lib';

class Dialog extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    onOk: PropTypes.func, // 点击确定回调
    onCancel: PropTypes.func.isRequired, // 点击遮罩层或右上角叉或取消按钮的回调
    open: PropTypes.bool, // 对话框是否可见
    footer: PropTypes.node // 底部内容
  }
  static defaultProps = {
    open: false
  }
  onClose = () => {
    this.props.onCancel();
  }
  handleOK = () => {
    if (this.props.onOk) {
      this.props.onOk();
    } else {
      this.onClose();
    }
  }
  render () {
    let { open, title, footer, className } = this.props;
    const classString = classNames(
      className,
      {
        'dialog-wrap': true
      }
    );
    if (open) {
      return createPortal(
        <div className={classString}>
          <div className="dialog-mask" onClick={this.onClose}></div>
          <div className="dialog-container">
            <div className="dialog__header">
              {
                title ? (
                  <div className="dialog__title">{title}</div>
                ) : null
              }
              <Icon type="close" className="dialog__close-btn" onClick={this.onClose}/>
            </div>
            <div className="dialog__body">
              {this.props.children}
            </div>
            {
              footer === undefined ? (
                <div className="dialog__footer">
                  <Button onClick={this.onClose}>取消</Button>
                  <Button type="green" onClick={this.handleOK}>确定</Button>
                </div>
              ) : footer
            }
          </div>
        </div>,
        document.body
      );
    }
    return null;
  }
}

export default Dialog;
