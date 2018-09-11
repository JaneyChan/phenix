import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * 组件props属性说明
 * @param type ['green', 'danger', 'default']分别为绿色按钮, 红色，默认白灰色按钮
 * @param size ['middle', 'small']分别为按钮高度为40px、32px
 */
class Button extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['green', 'danger', 'default']),
    size: PropTypes.oneOf(['middle', 'small']),
    onClick: PropTypes.func,
    className: PropTypes.string
  }
  static defaultProps = {
    type: 'default',
    size: 'middle'
  }
  render () {
    let { type, size, onClick, className } = this.props;
    let prefixCls = 'btn',
      btnClass = classNames(
        prefixCls,
        {
          [`${prefixCls}-${type}`]: type !== 'default',
          [`${prefixCls}-${size}`]: size !== 'middle'
        },
        className
      );
    return (
      <button
        type="button"
        className={btnClass}
        onClick={onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
