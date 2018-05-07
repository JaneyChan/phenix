import axios from 'axios';
import { ARTICLE_GET_LIST, ARTICLE_DETAIL } from '../constants'

// 获取文章列表
export const fetchArticles = () => {
    return (dispatch, getState)=> {
        axios.get('/api/article/list')
        .then((res) => {
          if(res.data.success) {
            dispatch({
                type: ARTICLE_GET_LIST,
                articleList: res.data.data
            });

            if(res.data.data && res.data.data.length > 0) {
                dispatch({
                    type: ARTICLE_DETAIL,
                    article: res.data.data[0]
                })
            }

          }
        });
    };
}

export const getDetailArticle = (article) => {
    return {
        type: ARTICLE_DETAIL,
        article: article
    };
}