import {
    ARTICLE_LIST_LOADING,
    ARTICLE_LIST_FAIL,
    ARTICLE_LIST_SUCCESS,
} from '../actions/actionType'

export type typeArticleListState = {
    authorName: {
        authorDisplayName: string
        authorName: string
        errorMsg: string
        actionStatus: string
        total: number
        img: string
        articles: [
            {
                title: string
                category: string
                sub_site_category: string
                id: string
                total_hits: number
                tag: string[]
                public_at: string
            }
        ]
    }
}

const DefaultState: typeArticleListState = {
    // 這邊應該要存整理過的資料

    authorName: {
        authorDisplayName: '',
        authorName: '',
        errorMsg: '',
        actionStatus: 'idle',
        total: 0,
        img: '',
        articles: [
            {
                title: '',
                category: '',
                sub_site_category: '',
                id: '',
                total_hits: 0,
                tag: [],
                public_at: '',
            },
        ],
    },
}

type ArticleAction = {
    type: string
    payload: {
        [key: string]: string | {}
    }
}

const ArticleListReducer = (
    state: typeArticleListState = DefaultState,
    action: ArticleAction
) => {
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
                [payload.userId as string]: {
                    ...state.authorName,
                    errorMsg: '',
                    actionStatus: 'loading',
                },
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
                [payload.userId as string]: {
                    // @ts-ignore
                    ...state[payload.userId as string],
                    errorMsg: payload.rej,
                    actionStatus: 'error',
                },
            }

        case ARTICLE_LIST_SUCCESS:
            const {
                // @ts-ignore
                res: { data },
            } = payload
            const compileArticles = data.articles.map(({ // @ts-ignore
                sub_site_category, category, title, id, hits: { total }, public_at, tags, user }) => ({
                category,
                title,
                sub_site_category,
                articleId: id,
                total_hits: total,
                public_at,
                tags: tags.map((obj) => obj.tag),
                avatar: user.avatar,
            }))

            return {
                ...state,

                [payload.userId as string]: {
                    ...state[payload.userId],
                    errorMsg: '',
                    actionStatus: 'success',
                    authorDisplayName: data.articles[0].user.display_name,
                    total: data.total,
                    AuthorName: data.articles[0].user.name,
                    articles: compileArticles,
                },
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
            return state
    }
}

export default ArticleListReducer
