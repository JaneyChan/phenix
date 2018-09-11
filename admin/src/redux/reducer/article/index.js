import { combineReducers } from 'redux';
import list from './list';
import detail from './detail';
import draft from './draft';

const article = combineReducers({
  draft,
  list,
  detail
});
export default article;
