import {
  ARTICLE_LOADING,
  ARTICLE_SUCCESS,
  ARTICLE_FAIL,
} from "../actions/actionType";

export type typeArticleState = {
  [key: string]: {
    status: string;
    errorMsg: string;
    body: string;
  };
};

type ArticleAction = {
  type: string;
  payload: {
    [key: string]: string | {};
  };
};
const DefaultState: typeArticleState = {
  articleId: {
    status: "idle",
    errorMsg: "",
    body: "",
  },
};

const ArticleReducer = (state = DefaultState, action: ArticleAction) => {
  const { payload } = action;
  switch (action.type) {
    case ARTICLE_LOADING:
      return {
        ...state,
        [payload.articleId as string]: {
          ...state[payload.articleId as string],
          status: "loading",
          errorMsg: "",
        },
      };
    case ARTICLE_SUCCESS:
      const {
        res: {
          //@ts-ignore
          data: {
            article: {
              body,
              category,
              hits,
              images,
              public_at,
              tags,
              title,
              user,
            },
          },
        },
      } = payload;
      return {
        ...state,
        [payload.articleId as string]: {
          ...state[payload.articleId as string],
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
          avatar: user.avatar,
        },
      };
    case ARTICLE_FAIL:
      return {
        ...state,
        [payload.articleId as string]: {
          ...state[payload.articleId as string],
          status: "error",
          errorMsg: payload.rej,
        },
      };
    default:
      return state;
  }
};
export default ArticleReducer;
