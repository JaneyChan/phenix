
import { SET_EXIT_EDITOR_DIALOG } from '../constants';

export const setAppSetting = (exitDialog) => {
  return {
    type: SET_EXIT_EDITOR_DIALOG,
    exitDialog
  };
};
