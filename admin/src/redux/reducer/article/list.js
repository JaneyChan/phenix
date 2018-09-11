import { SET_ARTICLE_LIST } from '../../constants';

const articleList = (state = { data: [], isEnd: false }, action) => {
  switch (action.type) {
    // 获取文章列表
    case SET_ARTICLE_LIST:
      return {
        data: [...action.data.articleList],
        isEnd: action.data.isEnd
      };
    default:
      return state;
  }
};

export default articleList;
