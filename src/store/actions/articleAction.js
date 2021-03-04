import axios from 'axios'
import fakeData from '../../data.json'
import {
    ARTICLE_LIST_LOADING,
    ARTICLE_LIST_FAIL,
    ARTICLE_LIST_SUCCESS,
    ARTICLE_LOADING,
    ARTICLE_SUCCESS,
    ARTICLE_FAIL
} from './actionType'

export const GetWriterArticles = (userId = "pinkymini") => dispatch => {
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
            console.log("res", res);
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


export const GetArticle = (articleId, authorName) => dispatch => {
    dispatch({
        type: ARTICLE_LOADING,
        payload: { articleId: articleId }
    })
    axios.get(`https://emma.pixnet.cc/blog/articles/${articleId}?user=${authorName}`)
        .then((res) => {
            console.log("res", res)
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
