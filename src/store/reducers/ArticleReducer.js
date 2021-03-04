import { ARTICLE_LOADING, ARTICLE_SUCCESS, ARTICLE_FAIL } from '../actions/actionType'

const DefaultState = {
    articleId: {
        status: "idle",
        errorMsg: "",
        body: ""
    }
}

const ArticleReducer = (state = DefaultState, action) => {
    const { payload } = action
    switch (action.type) {
        case ARTICLE_LOADING:
            return {
                ...state,
                [payload.articleId]: {
                    ...state[payload.articleId],
                    status: "loading",
                    errorMsg: ""
                }
            }
        case ARTICLE_SUCCESS:
            const { res: { data: { article: { body, category, hits, images, public_at, tags, title, user } } } } = payload
            return {
                ...state,
                [payload.articleId]: {
                    ...state[payload.articleId],
                    status: "success",
                    errorMsg: "",
                    body,
                    category,
                    hits,
                    images,
                    public_at,
                    tags,
                    title,
                    authorName: user.display_name,
                    avatar: user.avatar
                }
            }
        case ARTICLE_FAIL:
            return {
                ...state,
                [payload.articleId]: {
                    ...state[payload.articleId],
                    status: "error",
                    errorMsg: payload.rej,
                }
            }
        default:
            return state
    }

}
export default ArticleReducer