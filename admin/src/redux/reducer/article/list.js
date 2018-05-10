import { SET_ARTICLE_LIST } from '../../constants'

const articleList = (state = [], action) => {
    switch (action.type) {
        // 获取文章列表
        case SET_ARTICLE_LIST:
            return action.articleList;
        default:
            return state
    }
}

export default articleList
