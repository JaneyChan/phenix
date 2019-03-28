import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Button, Icon } from '@/components/lib';
import { closeCallback } from './events';
// import { makeChain } from '@/service/utils';

const btnText = {
  ok: '确认',
  cancel: '取消'
};
export default class Inner extends React.PureComponent {
  /**
   * @desc 渲染底部
   */
  renderFooter () {
    let { footer, footerActions, footerAlign } = this.props;
    if (footer === false) return null;

    const newClassName = cx({
      'modal-footer': true,
      [`align-${footerAlign}`]: true
    });
    const footerContent =
      footer === true || !footer
        ? footerActions.map(action => {
          const btnProps = this.props[`${action}Props`];
          const newBtnProps = {
            ...btnProps,
            className: btnProps.className,
            onClick: closeCallback(this.props[`on${action[0].toUpperCase() + action.slice(1)}`], this.props),
            children: btnText[action]
          };
          if (action === 'ok') {
            newBtnProps.type = 'green';
          }
          return <Button key={action} {...newBtnProps} />;
        })
        : footer;
    return <div className={newClassName}>{footerContent}</div>;
  }
  render () {
    const { maskCloseAble, closeable, title, children, onClose } = this.props;
    return (
      <React.Fragment>
        <div className="modal-mask" onClick={maskCloseAble ? onClose : undefined}></div>
        <div className="modal-panel">
          {
            closeable ? (
              <Icon className="modal-close" type='close' />
            ) : null
          }
          {title ? (<div className="modal-title">{title}</div>) : null}
          {
            children ? (
              <div className="modal-body">{children}</div>
            ) : null
          }
          {this.renderFooter()}
        </div>
      </React.Fragment>
    );
  }
}

Inner.propTypes = {
  closeable: PropTypes.bool, // 右上角有关闭按钮，默认为ture
  maskCloseAble: PropTypes.bool, // 点击遮罩层是否关闭对话框，默认为ture
  footerActions: PropTypes.array,
  footerAlign: PropTypes.oneOf(['left', 'center', 'right']), // 底部按钮位置对齐方式,默认右对齐
  okProps: PropTypes.object,
  cancelProps: PropTypes.object,
  className: PropTypes.string // 外部控制样式
};

Inner.defaultProps = {
  closeable: true,
  maskCloseAble: true,
  footerActions: ['cancel', 'ok'],
  footerAlign: 'right',
  okProps: {},
  cancelProps: {},
  className: ''
};
