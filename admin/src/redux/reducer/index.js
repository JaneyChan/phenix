import { combineReducers } from 'redux';
import article from './article/index';
import category from './category/index';
import appSetting from './appSetting/index';

const reducer = combineReducers({
  article,
  category,
  appSetting
});

export default reducer;
