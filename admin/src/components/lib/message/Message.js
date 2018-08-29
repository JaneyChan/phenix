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
        <div className="message-content">
          <Icon type={ICON_TYPE[status]} className={`message-icon message-${status}`}/>
          <span>{this.props.text}</span>
        </div>
      );
    }
}

/**
 * @param {*} text 显示文案
 * @param {*} duration 显示时长
 * @param {*} status message状态: success: 成功， error: 错误  warning: 警告
 */
const show = (text, duration = 3000, status) => {
  let noticeWrap = document.getElementById('message-wrap');
  if (!noticeWrap) {
    noticeWrap = document.createElement('div');
    noticeWrap.id = 'message-wrap';
    noticeWrap.className = 'message-container';
    noticeWrap.style.top = '100px';
    document.body.appendChild(noticeWrap);
  }

  // 创建message节点，进行渲染
  let noticeDiv = document.createElement('div');
  noticeDiv.className = 'message-box message-in';
  noticeWrap.appendChild(noticeDiv);

  const render = () => {
    ReactDOM.render((<MessageContent text={text} status={status} />), noticeDiv);
  };
  const destroy = () => {
    const unmountResult = ReactDOM.unmountComponentAtNode(noticeDiv);
    if (unmountResult && noticeWrap.parentNode) {
      document.getElementById('message-wrap').removeChild(noticeDiv);
    }
  };

  // 渲染
  render();

  // 定时移除该节点
  setTimeout(() => {
    noticeDiv.className = 'message-box message-out';
    setTimeout(() => {
      destroy();
    }, 800);
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
