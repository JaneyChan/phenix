import { combineReducers } from 'redux';
import article from './article/index';
import category from './category/index';

const reducer = combineReducers({
    article,
    category
});
export default reducer;
