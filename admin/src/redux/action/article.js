import fetch from '@/utils/fetch';
import { SET_ARTICLE_LIST, SET_ARTICLE_DETAIL } from '../constants';
import { Message } from '@/components/lib';
// 获取文章列表
export const getArticleList = () => {
  return (dispatch) => {
    fetch.get('/api/article/list')
      .then((res) => {
        if (res.success) {
          dispatch(setArticleList(res.data));
          if (res.data && res.data.length > 0) {
            dispatch(setDetailArticle(res.data[0]));
          }
        }
      })
      .catch(() => {
        dispatch(setArticleList([]));
        dispatch(setDetailArticle({}));
      });
  };
};

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

export const updateArticle = (article) => {
  return (dispatch, getState) => {
    fetch.post('/api/article/update', article)
      .then((res) => {
        if (res.success) {
          Message.success('保存文章成功');
          let list = getState().article.list.data;
          for (let i = 0; i < list.length; i++) {
            if (list[i].id === article.id) {
              list[i] = article;
            }
          }
          dispatch(setArticleList(list));
          dispatch(setDetailArticle(article));
        }
      });
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
