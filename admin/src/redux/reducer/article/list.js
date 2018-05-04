import { ARTICLE_GET_LIST } from '../../constants'

const articleList = (state = [], action) => {
    switch (action.type) {
        // 获取文章列表
        case ARTICLE_GET_LIST:
            return action.articleList;
        default:
            return state
    }
}

export default articleList
