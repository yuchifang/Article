import { ARTICLE_LIST_LOADING, ARTICLE_LIST_FAIL, ARTICLE_LIST_SUCCESS } from '../actions/actionType'


const DefaultState = {
    //這邊應該要存整理過的資料

    authorName: {
        authorDisplayName: "",
        authorName: "",
        errorMsg: "",
        actionStatus: "idle",
        total: 0,
        img: "",
        articles: [{
            title: "",
            category: "",
            sub_site_category: "",
            id: "",
            total_hits: 0,
            tag: [],
            public_at: ""
        }]
    }
}

const ArticleListReducer = (state = DefaultState, action) => {
    const { payload } = action
    switch (action.type) {
        case ARTICLE_LIST_LOADING:
            // console.log({ payload })
            // return {
            //     ...state,
            //     errorMsg: "",
            //     actionStatus: "loading"
            // }
            return {
                ...state,
                [payload.userId]: {
                    ...state.authorName,
                    errorMsg: "",
                    actionStatus: "loading"
                }
            }
        case ARTICLE_LIST_FAIL:

            // console.log({ payload })
            // return {
            //     ...state,
            //     errorMsg: action.payload,
            //     actionStatus: "error"
            // }
            return {
                ...state,
                [payload.userId]: {
                    ...state[payload.userId],
                    errorMsg: payload.rej,
                    actionStatus: "error"
                }
            }

        case ARTICLE_LIST_SUCCESS:
            const { res: { data } } = payload
            const compileArticles = data.articles.map(({
                sub_site_category,
                category,
                title,
                id,
                hits: { total },
                public_at,
                tags,
                user
            }) => ({
                category,
                title,
                sub_site_category,
                articleId: id,
                total_hits: total,
                public_at,
                tags: tags.map(obj => obj.tag),
                avatar: user.avatar
            }))

            return {
                ...state,
                [payload.userId]: {
                    ...state[payload.userId],
                    errorMsg: "",
                    actionStatus: 'success',
                    authorDisplayName: data.articles[0].user.display_name,
                    total: data.total,
                    AuthorName: data.articles[0].user.name,
                    articles: compileArticles
                }
                /*
                articles: [{
                    title: "",
                    category: "",
                    sub_site_category: "",
                    id: "",
                    hits: 0,
                    tag: [],
                    public_at: ""
                }]
                */
            }
        default:
            return state;
    }
}

export default ArticleListReducer