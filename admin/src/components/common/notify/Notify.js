import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class NotifyContent extends PureComponent {
    static propTypes = {
        text: PropTypes.string,
        status: PropTypes.oneOf(['success', 'error', 'warning'])
    }
    static defaultProps = {
        status: success
    }
    render() {
        let { status } = this.props;
        return (
            <div className="notify-box">
                <div className={`notify-icon icon_${status}`}></div>
                <div>{this.props.text}</div>
            </div>
        );
    }
}

/**
 * 
 * @param {*} text 显示文案
 * @param {*} duration 显示时长
 * @param {*} status notify状态: success: 成功， error: 错误  warning: 警告
 */
const show = (text, duration = 20000, status) => {
    let noticeDiv = document.createElement('div');
    noticeDiv.className = 'notify-container';
    document.body.appendChild(noticeDiv);

    render();

    setTimeout(() => {
        destroy();
    }, duration)

    function render() {
        ReactDOM.render((<NotifyContent text={text} status={status} />), noticeDiv);
    }

    function destroy() {
        const unmountResult = ReactDOM.unmountComponentAtNode(noticeDiv);
        if (unmountResult && noticeDiv.parentNode) {
            noticeDiv.parentNode.removeChild(noticeDiv);
        }
    }
}

export const success = (text, duration) => {
    return show(text, duration, 'success')
}

export const error = (text, duration) => {
    return show(text, duration, 'error')
}

export const warning = (text, duration) => {
    return show(text, duration, 'warning')
}