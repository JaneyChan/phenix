import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Icon } from '@/components/lib';

const ICON_TYPE = {
  info: 'info-circle',
  success: 'check-circle',
  error: 'cross-circle',
  warning: 'exclamation-circle',
  loading: 'loading'
};

class MessageContent extends PureComponent {
    static propTypes = {
      text: PropTypes.string,
      status: PropTypes.oneOf(['info', 'success', 'error', 'warning'])
    }
    static defaultProps = {
      status: 'success'
    }
    render () {
      let { status } = this.props;
      return (
        <div className="message-box">
          <div className="message-content">
            <Icon type={ICON_TYPE[status]} className={`message-icon message-${status}`}/>
            <span>{this.props.text}</span>
          </div>
        </div>
      );
    }
}

/**
 * @param {*} text 显示文案
 * @param {*} duration 显示时长
 * @param {*} status message状态: success: 成功， error: 错误  warning: 警告
 */
const show = (text, duration = 2000, status) => {
  let noticeDiv = document.createElement('div');
  noticeDiv.className = 'message-container';
  document.body.appendChild(noticeDiv);
  const render = () => {
    ReactDOM.render((<MessageContent text={text} status={status} />), noticeDiv);
  };
  const destroy = () => {
    const unmountResult = ReactDOM.unmountComponentAtNode(noticeDiv);
    if (unmountResult && noticeDiv.parentNode) {
      noticeDiv.parentNode.removeChild(noticeDiv);
    }
  };
  render();

  setTimeout(() => {
    destroy();
  }, duration);
};

export const info = (text, duration) => {
  return show(text, duration, 'info');
};

export const success = (text, duration) => {
  return show(text, duration, 'success');
};

export const error = (text, duration) => {
  return show(text, duration, 'error');
};

export const warning = (text, duration) => {
  return show(text, duration, 'warning');
};
