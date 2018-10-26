import Modal from './Modal';
import { confirm, info, success, warning, error } from './confirm';

Modal.confirm = confirm;
Modal.info = info;
Modal.success = success;
Modal.warning = warning;
Modal.error = error;

export default Modal;
