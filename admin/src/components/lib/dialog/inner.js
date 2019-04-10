import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Button, Icon } from '@/components/lib';
import { makeChain } from '@/service/utils';

const noop = () => {};

const btnText = {
  ok: '确认',
  cancel: '取消'
};
export default class Inner extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    footerActions: PropTypes.array,
    footerAlign: PropTypes.oneOf(['left', 'center', 'right']),
    closeable: PropTypes.bool,
    okProps: PropTypes.object,
    cancelProps: PropTypes.object
  };
  static defaultProps = {
    footerActions: ['ok', 'cancel'],
    footerAlign: 'right',
    closeable: true,
    onOk: noop,
    onCancel: noop,
    okProps: {},
    cancelProps: {}
  };
  renderFooter () {
    let { footer, footerActions, footerAlign } = this.props;
    if (footer === false) return null;

    const newClassName = cx({
      'dialog-footer': true,
      [`align-${footerAlign}`]: true
    });
    const footerContent =
      footer === true || !footer
        ? footerActions.map(action => {
          const btnProps = this.props[`${action}Props`];
          const newBtnProps = {
            ...btnProps,
            className: cx('dialog-btn', btnProps.className),
            onClick: makeChain(
              this.props[`on${action[0].toUpperCase() + action.slice(1)}`],
              btnProps.onClick
            ),
            children: btnProps.children || btnText[action]
          };
          if (action === 'ok') {
            newBtnProps.type = 'green';
          }
          return <Button key={action} {...newBtnProps} />;
        })
        : footer;
    return <div className={newClassName}>{footerContent}</div>;
  }

  renderCloseBtn = () => {
    const { closeable, onCancel } = this.props;
    if (!closeable) return null;

    return (
      <a href="javascript:;" className="dialog-close" onClick={onCancel}>
        <Icon className="close-icon" type="close" />
      </a>
    );
  }
  render () {
    const { className, title, children } = this.props;
    const newClassName = cx('modal', {
      [className]: !!className
    });
    const footer = this.renderFooter();
    const closeBtn = this.renderCloseBtn();
    return (
      <div className={newClassName}>
        {title ? <div className="dialog-header">{title}</div> : null}
        {children ? (
          <div className="dialog-body">{children}</div>
        ) : null}
        {footer}
        {closeBtn}
      </div>
    );
  }
}
