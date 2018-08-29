import fetch from '@/utils/fetch';
import { SET_ARTICLE_DRAFT, SET_ARTICLE_LIST, SET_ARTICLE_DETAIL } from '../constants';

export const getArticlesByCatogoryId = (categoryId) => {
  return (dispatch) => {
    return fetch.post('/api/articles/category', {
      categoryId
    })
      .then((res) => {
        if (res.success) {
          dispatch(setArticleList(res.data));
        }
      });
  };
};

// 创建文章
export const createArticle = (categoryId) => {
  return (dispatch, getState) => {
    fetch.post('/api/article/create', {
      categoryId
    })
      .then((res) => {
        if (res.success) {
          let list = getState().article.list.data;
          list.push(res.data);
          dispatch(setArticleList(list));
          dispatch(setDetailArticle(res.data));
        }
      });
  };
};

export const setArticleDraft = (article) => {
  return {
    type: SET_ARTICLE_DRAFT,
    draft: article
  };
};

export const setArticleList = (list) => {
  return {
    type: SET_ARTICLE_LIST,
    data: {
      isEnd: true,
      articleList: list
    }
  };
};

export const setDetailArticle = (article) => {
  return {
    type: SET_ARTICLE_DETAIL,
    article
  };
};
