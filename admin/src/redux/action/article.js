import axios from 'axios';
import { SET_ARTICLE_LIST, SET_ARTICLE_DETAIL } from '../constants'

// 获取文章列表
export const getArticleList = () => {
    return (dispatch, getState)=> {
        axios.get('/api/article/list')
        .then((res) => {
          if(res.data.success) {

            dispatch(setArticleList(res.data.data));
            if(res.data.data && res.data.data.length > 0) {
                dispatch(setDetailArticle(res.data.data[0]));
            }

          }
        });
    };
}

// 创建文章
export const createArticle = () => {
    return (dispatch, getState) => {
        axios.post('/api/article/create')
        .then((res) => {
            if(res.data.success) {
                let list = getState().article.list;
                list.unshift(res.data.data)
                dispatch(setArticleList(list));
                dispatch(setDetailArticle(res.data.data));
            }
        });
    };
}

export const updateArticle = (article) => {
    return (dispatch, getState) => {
        axios.post('/api/article/update', article)
        .then((res) => {
            if(res.data.success) {
                let list = getState().article.list;
                for(let i = 0; i < list.length; i++) {
                    if(list[i].id === article.id) {
                        list[i] = article;
                    }
                }
                dispatch(setArticleList(list));
                dispatch(setDetailArticle(article));
            }
        });
    };
}

export const setArticleList = (list) => {
    return {
        type: SET_ARTICLE_LIST,
        articleList: list
    };
}

export const setDetailArticle = (article) => {
    return {
        type: SET_ARTICLE_DETAIL,
        article
    };
}