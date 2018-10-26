import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import { Icon } from '@/components/lib';

const ConfirmModal = (props) => {
  const iconType = props.iconType || 'question-circle';
  const { onCancel, onOk, close, visible } = props;

  return (
    <Modal
      visible={visible}
      title=""
      closable={false}
      onClose={() => {
        onCancel && typeof onCancel === 'function' && onCancel();
        close({ tiggerCancel: true });
      }}
      onOk={() => {
        onOk && typeof onOk === 'function' && onOk();
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
    </Modal>
  );
};

export function confirm ({...config}) {
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
    ReactDOM.render(<ConfirmModal {...props} />, confirmDiv);
  }
  render({ ...config, visible: true, close });
}

export const info = (props) => {
  const config = {
    iconType: 'info-circle',
    ...props
  };
  return confirm(config);
};

export const success = (props) => {
  const config = {
    iconType: 'check-circle',
    ...props
  };
  return confirm(config);
};

export const warning = (props) => {
  const config = {
    iconType: 'exclamation-circle',
    ...props
  };
  return confirm(config);
};

export const error = (props) => {
  const config = {
    iconType: 'cross-circle',
    ...props
  };
  return confirm(config);
};
