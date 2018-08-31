import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Icon } from '@/components/lib';

class Modal extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    onOk: PropTypes.func, // 点击确定回调
    okType: PropTypes.oneOf(['green', 'danger']), // 确定按钮类型
    onCancel: PropTypes.func.isRequired, // 点击遮罩层或右上角叉或取消按钮的回调
    closable: PropTypes.bool, // 是否显示右上角的关闭按钮
    footer: PropTypes.node // 底部内容
  }
  static defaultProps = {
    closable: true,
    okType: 'green'
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
    let { title, closable, okType, footer, className } = this.props;
    const classString = classNames(
      className,
      {
        'dialog-container': true
      }
    );
    return (
      <div className="dialog-wrap">
        <div className="dialog-mask" onClick={this.onClose}></div>
        <div className={classString}>
          {
            title || closable ? (
              <div className="dialog__header">
                {
                  title ? (
                    <div className="dialog__title">{title}</div>
                  ) : null
                }
                {
                  closable ? (
                    <Icon type="close" className="dialog__close-btn" onClick={this.onClose}/>
                  ) : null
                }
              </div>
            ) : null
          }
          <div className="dialog__body">
            {this.props.children}
          </div>
          {
            footer === undefined ? (
              <div className="dialog__footer">
                <Button size="small" onClick={this.onClose}>取消</Button>
                <Button type={okType} size="small" onClick={this.handleOK}>确定</Button>
              </div>
            ) : footer
          }
        </div>
      </div>
    );
  }
}

export default Modal;
