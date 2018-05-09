import axios from 'axios';
import { GET_ARTICLE_LIST, GET_ARTICLE_DETAIL, CREATE_ARTICLE } from '../constants'

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
    return (dispatch, getState)=> {
        axios.post('/api/article/create')
        .then((res) => {
            if(res.data.success) {
                console.log('res.data.data : ' + JSON.stringify(res.data.data));
                dispatch(insertArticleToList(res.data.data));
                dispatch(setDetailArticle(res.data.data));
            }
        });
    };
}

export const setArticleList = (list) => {
    return {
        type: GET_ARTICLE_LIST,
        articleList: list
    };
}

export const insertArticleToList = (article) => {
    return {
        type: CREATE_ARTICLE,
        article
    };
}

export const setDetailArticle = (article) => {
    return {
        type: GET_ARTICLE_DETAIL,
        article
    };
}