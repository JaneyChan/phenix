import { GET_ARTICLE_LIST, CREATE_ARTICLE } from '../../constants'

const articleList = (state = [], action) => {
    switch (action.type) {
        // 获取文章列表
        case GET_ARTICLE_LIST:
            return action.articleList;
        case CREATE_ARTICLE:
            return [action.article, ...state];
        default:
            return state
    }
}

export default articleList
