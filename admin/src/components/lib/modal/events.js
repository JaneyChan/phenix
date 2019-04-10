import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { getUidStr } from '@/service/utils';
import Inner from './inner';

const containers = {};
const DURATION = 300;

function getDiv (id) {
  const mod = containers[id];
  return mod ? mod.div : null;
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
    div.style.display = 'none'
    if (props.destroy) destroy(id);
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

export function open (props, isPortal) {
  const { content, onCancel, ...otherProps } = props;
  const div = createDiv(props);
  div.style.display = 'flex';

  const handleClose = () => {
    if (onCancel) onCancel();
    if (!isPortal) close(props);
  };

  const maskOpacity = isMask(props.id) ? props.maskOpacity || 0.25 : 0.01;
  div.style.background = `rgba(0,0,0,${maskOpacity})`;

  containers[props.id].visible = true;

  setTimeout(() => {
    div.classList.add('modal-show');
  }, 10);

  const panel = (
    <Inner {...otherProps} onCancel={handleClose}>
      {content}
    </Inner>
  );

  if (isPortal) return ReactDOM.createPortal(panel, div);
  if (document.activeElement) document.activeElement.blur();

  ReactDOM.render(panel, div);
}

export const closeCallback = (fn, option) => () => {
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
