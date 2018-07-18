import { SET_ARTICLE_DETAIL } from '../../constants';

const detailArticle = (state = {}, action) => {
  switch (action.type) {
    case SET_ARTICLE_DETAIL:
      return { ...action.article };
    default:
      return state;
  }
};
export default detailArticle;
