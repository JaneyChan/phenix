import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from './Modal';
import { Icon } from '@/components/lib';

const ConfirmDialog = (props) => {
  const iconType = props.iconType || 'question-circle';
  const { onCancel, close } = props;

  return (
    <Dialog
      visible={open}
      title=""
      closable={false}
      onCancel={() => {
        onCancel && typeof onCancel === 'function' && onCancel();
        close({ tiggerCancel: true });
      }}
      okType={props.okType}
    >
      <div className="confirm-body">
        <div className="confirm-body__header">
          <Icon type={ iconType } />
          <span className="confirm-title">{props.title}</span>
        </div>
        <div className="confirm-body__content">{props.content}</div>
      </div>
    </Dialog>
  );
};

export default function confirm (config) {
  let confirmDiv = document.createElement('div');
  document.body.appendChild(confirmDiv);

  function close (...args) {
    destroy(...args);
  }

  function destroy (...args) {
    const unmountResult = ReactDOM.unmountComponentAtNode(confirmDiv);
    if (unmountResult && confirmDiv.parentNode) {
      confirmDiv.parentNode.removeChild(confirmDiv);
    }
    const triggerCancel = args && args.length &&
      args.some(param => param && param.triggerCancel);
    if (config.onCancel && triggerCancel) {
      config.onCancel(...args);
    }
  }

  function render (props) {
    ReactDOM.render(<ConfirmDialog {...props} />, confirmDiv);
  }
  render({ ...config, visible: true, close });
}
