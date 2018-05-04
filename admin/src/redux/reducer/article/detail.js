import { ARTICLE_SAVE_SUCCESS } from '../../constants'

const detailArticle = (state = {}, action) => {
    switch (action.type) {
        case ARTICLE_SAVE_SUCCESS:
            return action.article;
        default:
            return state
    }
}
export default detailArticle
