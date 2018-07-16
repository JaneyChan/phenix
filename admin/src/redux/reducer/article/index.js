import { combineReducers } from 'redux';
import list from './list';
import detail from './detail';

const article = combineReducers({
  list,
  detail
});
export default article;
