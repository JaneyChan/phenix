import axios from 'axios';
import { ARTICLE_GET_LIST, ARTICLE_SAVE_SUCCESS } from '../constants'

// 获取文章列表
export function fetchArticles() {
    return (dispatch, getState)=> {
        axios.get('/api/article/list')
        .then((res) => {
          if(res.data.success) {
            dispatch({
                type: ARTICLE_GET_LIST,
                articleList: res.data.data
            });
          }
        });
    };
}

export function createArticle() {
    return (dispatch, getState)=> {
        axios.post('/api/article/create')
        .then((res) => {
          if(res.data.success) {
            dispatch({
                type: ARTICLE_SAVE_SUCCESS,
                article: res.data.data
            });
          }
        });
    };
}