import Modal from './Modal';
import { method } from './events';

Modal.success = method('success');
Modal.info = method('info');
Modal.warn = method('warning');
Modal.error = method('error');
Modal.confirm = method('confirm');

export default Modal;
