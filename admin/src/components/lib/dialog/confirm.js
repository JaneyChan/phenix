import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from './Modal';
import { Icon } from '@/components/lib';

const ConfirmDialog = (props) => {
  const iconType = props.iconType || 'question-circle';
  return (
    <Dialog
      visible={open}
      title=""
      closable={false}
      onCancel={() => { }}
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

  function render (props) {
    ReactDOM.render(<ConfirmDialog {...props} />, confirmDiv);
  }
  render({ ...config, visible: true });
}
