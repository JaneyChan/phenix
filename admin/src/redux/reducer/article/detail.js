import { ARTICLE_DETAIL } from '../../constants'

const detailArticle = (state = {}, action) => {
    switch (action.type) {
        case ARTICLE_DETAIL:
            return action.article;
        default:
            return state
    }
}
export default detailArticle
