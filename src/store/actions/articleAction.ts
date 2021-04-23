import axios from 'axios'
// import fakeData from '../../data.json'
import { ThunkDispatch } from 'redux-thunk';
import store from "../store"
import { Action } from 'redux';
import {
    ARTICLE_LIST_LOADING,
    ARTICLE_LIST_FAIL,
    ARTICLE_LIST_SUCCESS,
    ARTICLE_LOADING,
    ARTICLE_SUCCESS,
    ARTICLE_FAIL
} from './actionType'

import { typeArticleListState } from "../reducers/WriterListReducer"
import { typeArticleState } from '../reducers/ArticleReducer'

export const GetWriterArticles = (userId = "pinkymini") => (dispatch: ThunkDispatch<typeArticleListState, void, Action>) => {



    dispatch({
        type: ARTICLE_LIST_LOADING,
        payload: { userId }
    })
    // dispatch({
    //     type: ARTICLE_LIST_SUCCESS,
    //     payload: { res: fakeData.pinkymini, userId: userId }
    // })

    axios.get(`https://emma.pixnet.cc/blog/articles?user=${userId}&per_page=100`)
        .then((res) => {
            dispatch({
                type: ARTICLE_LIST_SUCCESS,
                payload: { res: res, userId: userId }
            })
        })
        .catch((rej) => {
            dispatch({
                type: ARTICLE_LIST_FAIL,
                payload: { rej: rej, userId: userId }
            })
        })
}

export const GetArticle = (articleId: string, authorName: string) => (dispatch: ThunkDispatch<typeArticleState, void, Action>) => {
    dispatch({
        type: ARTICLE_LOADING,
        payload: { articleId: articleId }
    })
    axios.get(`https://emma.pixnet.cc/blog/articles/${articleId}?user=${authorName}`)
        .then((res) => {
            dispatch({
                type: ARTICLE_SUCCESS,
                payload: { res: res, articleId: articleId }
            })
        })
        .catch((rej) => {
            dispatch({
                type: ARTICLE_FAIL,
                payload: { rej: rej, articleId: articleId }
            })
        })

}
