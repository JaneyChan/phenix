import { GET_ARTICLE_DETAIL } from '../../constants'

const detailArticle = (state = {}, action) => {
    switch (action.type) {
        case GET_ARTICLE_DETAIL:
            return action.article;
        default:
            return state
    }
}
export default detailArticle
