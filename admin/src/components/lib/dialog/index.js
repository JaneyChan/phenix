import Modal from './Modal';
import confirm from './confirm';

Modal.confirm = (props) => {
  const config = {
    ...props
  };
  return confirm(config);
};

Modal.info = (props) => {
  const config = {
    iconType: 'info-circle',
    ...props
  };
  return confirm(config);
};

Modal.success = (props) => {
  const config = {
    iconType: 'check-circle',
    ...props
  };
  return confirm(config);
};

Modal.warning = (props) => {
  const config = {
    iconType: 'exclamation-circle',
    ...props
  };
  return confirm(config);
};

Modal.error = (props) => {
  const config = {
    iconType: 'cross-circle',
    ...props
  };
  return confirm(config);
};

export default Modal;
