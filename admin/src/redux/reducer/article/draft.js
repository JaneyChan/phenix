import { SET_ARTICLE_DRAFT } from '../../constants';

const articleDraft = (state = {}, action) => {
  switch (action.type) {
    case SET_ARTICLE_DRAFT:
      return { ...action.draft };
    default:
      return state;
  }
};
export default articleDraft;
