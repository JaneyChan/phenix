import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { getUidStr } from '@/service/utils';
import Inner from './inner';
import { Button } from '@/components/lib';

const containers = {};
const DURATION = 300;

function getDiv (id) {
  const mod = containers[id];
  return mod ? mod.div : null;
}

function hasVisible () {
  return Object.keys(containers).some(k => containers[k].visible);
}

function isMask (id) {
  const ids = Object.keys(containers).filter(k => containers[k].visible);
  if (ids.length === 0) return true;
  return ids[0] === id;
}

export function destroy (id, unmount) {
  const div = getDiv(id);
  if (!div) return;
  delete containers[id];
  if (unmount) ReactDOM.unmountComponentAtNode(div);
  document.body.removeChild(div);
}

export function close (props) {
  const { id } = props;
  const modal = containers[props.id];

  if (!modal || modal.visible === false) return;
  modal.visible = false;

  const { div } = modal;
  div.classList.remove('modal-show');

  setTimeout(() => {
    div.style.display = 'none';
    if (props.destroy) destroy(id);

    if (!hasVisible()) {
      const doc = document.body.parentNode;
      doc.style.overflow = '';
      doc.style.paddingRight = '';
    }
  }, DURATION);
}

export function createDiv (props) {
  const { id } = props;
  let div = getDiv(props.id);
  if (div) return div;

  div = document.createElement('div');
  document.body.appendChild(div);
  div.className = classnames('modal');

  containers[id] = { div };

  return div;
}

// eslint-disable-next-line
export function open (props, isPortal) {
  const { content, onClose, ...otherProps } = props;
  const div = createDiv(props);

  div.style.display = 'flex';

  const scrollWidth = window.innerWidth - document.body.clientWidth;
  const doc = document.body.parentNode;
  doc.style.overflow = 'hidden';
  doc.style.paddingRight = `${scrollWidth}px`;

  const handleClose = () => {
    if (onClose) onClose();
    if (!isPortal) close(props);
  };

  const maskOpacity = isMask(props.id) ? props.maskOpacity || 0.25 : 0.01;
  div.style.background = `rgba(0,0,0,${maskOpacity})`;

  containers[props.id].visible = true;

  setTimeout(() => {
    div.classList.add('modal-show');
  }, 10);

  otherProps.footer = [btnCancel(props), btnOk(props)];

  const panel = (
    <Inner {...otherProps} onClose={handleClose}>
      {content}
    </Inner>
  );

  if (isPortal) return ReactDOM.createPortal(panel, div);
  if (document.activeElement) document.activeElement.blur();

  ReactDOM.render(panel, div);
}

const closeCallback = (fn, option) => () => {
  let callback;
  if (fn) callback = fn();
  if (callback && typeof callback.then === 'function') {
    callback.then(() => {
      close(option);
    });
  } else {
    close(option);
  }
};

const btnOk = option => {
  const onClick = closeCallback(option.onOk, option);
  return (
    <Button key='ok' type='green' size="small" onClick={onClick}>确定</Button>
  );
};

const btnCancel = option => {
  const onClick = closeCallback(option.onCancel, option);
  return (
    <Button key='cancel' size="small" onClick={onClick}>取消</Button>
  );
};

export const method = type => option => {
  const props = Object.assign(
    {
      width: 420
    },
    option,
    {
      id: getUidStr(),
      destroy: true,
      type
    }
  );

  open(props);
  return () => close(props);
};
