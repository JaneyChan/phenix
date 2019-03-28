import Dialog from './Dialog';
import { confirm, info, success, warning, error } from './confirm';

Dialog.confirm = confirm;
Dialog.info = info;
Dialog.success = success;
Dialog.warning = warning;
Dialog.error = error;

export default Dialog;
