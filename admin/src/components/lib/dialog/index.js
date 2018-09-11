import Dialog from './Dialog';
import confirm from './confirm';

Dialog.confirm = (props) => {
  const config = {
    ...props
  };
  return confirm(config);
};

Dialog.info = (props) => {
  const config = {
    iconType: 'info-circle',
    ...props
  };
  return confirm(config);
};

Dialog.success = (props) => {
  const config = {
    iconType: 'check-circle',
    ...props
  };
  return confirm(config);
};

Dialog.warning = (props) => {
  const config = {
    iconType: 'exclamation-circle',
    ...props
  };
  return confirm(config);
};

Dialog.error = (props) => {
  const config = {
    iconType: 'cross-circle',
    ...props
  };
  return confirm(config);
};

export default Dialog;
