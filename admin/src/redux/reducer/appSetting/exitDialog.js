import { SET_EXIT_EDITOR_DIALOG } from '../../constants';

const setEditorDialog = (state = { open: false }, action) => {
  switch (action.type) {
    case SET_EXIT_EDITOR_DIALOG:
      return { ...action.exitDialog };
    default:
      return state;
  }
};
export default setEditorDialog;
