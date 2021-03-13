import { ARTICLE_LOADING, ARTICLE_SUCCESS, ARTICLE_FAIL } from '../actions/actionType'

export type typeArticleState = {
    articleId: {
        status: string,
        errorMsg: string,
        body: string
    }
}

type ArticleAction = {
    type: string,
    payload: {
        [key: string]: string | {},
    }
}
const DefaultState = {
    articleId: {
        status: "idle",
        errorMsg: "",
        body: ""
    }
}

const ArticleReducer = (state = DefaultState, action: ArticleAction) => {
    const { payload } = action
    switch (action.type) {
        case ARTICLE_LOADING:
            return {
                ...state,
                //@ts-ignore
                [payload.articleId]: {
                    //@ts-ignore
                    ...state[payload.articleId],
                    status: "loading",
                    errorMsg: ""
                }
            }
        case ARTICLE_SUCCESS:
            //@ts-ignore
            const { res: { data: { article: { body, category, hits, images, public_at, tags, title, user } } } } = payload
            return {
                ...state,
                //@ts-ignore
                [payload.articleId]: {
                    //@ts-ignore
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
                //@ts-ignore
                [payload.articleId]: {
                    //@ts-ignore
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