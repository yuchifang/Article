import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { GetArticle } from '../store/actions/articleAction'
import { useDispatch, useSelector } from 'react-redux'
import { WContainer } from '../styles/General'
import { timestampToDate } from "../utils/utils"
import { RouteComponentProps } from "react-router-dom"
import { RootState } from '../store/reducers/RootReducer'

type Location = {
    articleId: string
}
interface ArticlePageProps extends RouteComponentProps<{}, {}, Location> {

}

type Tag = {
    added_by: string;
    is_poi: boolean,
    locked: number,
    tag: string
}

type ArticleState = {
    status: string,
    errorMsg: string,
    body: string,
    category?: string,
    title?: string,
    avatar?: string,
    authorName?: string,
    public_at?: string,
    tags?: Tag[]
}

export default function ArticlePage({ location: { state: { articleId } }, history }: ArticlePageProps) {

    const dispatch = useDispatch()
    const articleList = useSelector((state: RootState) => state.WriterList)

    const { [articleId]: article }: { [articleId: string]: ArticleState } = useSelector((state: RootState) => state.Article)
    // @ts-ignore
    const authorName = articleList.pinkymini.AuthorName

    useEffect(() => {
        dispatch(GetArticle(articleId, authorName))
    }, [authorName, articleId])

    const handleTagClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as Element
        const locationInfo = {
            pathname: `/ResultPage`,
            state: {
                articleId,
                searchValue: target.innerHTML,
            }
        }
        history.push(locationInfo)
    }


    console.log("article", article)

    return (
        (article?.status === "success") ?
            <W.ArticlePageSection>
                <W.ArticlePageContainer>
                    <W.ArticleHeader>
                        {!!article.category && article.category !== "未分類" && article.category.length > 0 &&
                            <W.Category>{article.category}</W.Category>}
                        <W.ArticleTitle>{article.title}</W.ArticleTitle>
                    </W.ArticleHeader>
                    <W.ArticleBlock>
                        <W.ArticleInfo>
                            <W.ArticleFigure>
                                <W.Img src={article.avatar} />
                            </W.ArticleFigure>
                            <W.Author>作者:{article.authorName}</W.Author>
                            <W.PublicTime>{timestampToDate(article?.public_at)}</W.PublicTime>
                            <W.TagList>
                                {(!!article?.tags && article?.tags.length > 0) ? article?.tags.map((item: Tag, index: number) =>
                                    <W.Tag
                                        key={index}
                                        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleTagClick(e)}>
                                        {item.tag}
                                    </W.Tag>
                                ) : null}
                            </W.TagList>
                        </W.ArticleInfo>
                        <W.ArticleContent dangerouslySetInnerHTML={{ __html: article.body }} />
                    </W.ArticleBlock>
                </W.ArticlePageContainer>
            </W.ArticlePageSection>
            : null
    )
}

let W: { [key: string]: any } = {}

W.TagList = styled.div`
    display: flex;
    flex-wrap: wrap;
`

W.Tag = styled.div`
    padding: 5px;
    border: 1px solid black;
    border-radius: 15px;
    line-height: 0.8;
    margin: 2px 5px;
    cursor: pointer;
`

W.ArticleHeader = styled.div`
    max-width:720px;
    padding: 25px 0;
    margin:auto;
`

W.Category = styled.p`
    font-size: 15px;
    line-height: 20px;
    margin:auto;
    font-weight: bold; 
    padding-left:10px;   
`

W.ArticleTitle = styled.h1`
    font-size: 30px;
    line-height: 35px;
    margin:auto;
`

W.ArticleInfo = styled.div`
    position: absolute;
    left: -60%;
    width: 250px;
`

W.ArticleFigure = styled.figure`
    text-align: center;
    margin-bottom: 5px;
`

W.Img = styled.img`

`

W.Author = styled.p`
    margin-bottom:5px;
`

W.PublicTime = styled.p`
    margin-bottom:5px;
`

W.ArticleBlock = styled.div`
    position:relative;
    max-width:580px;
    margin:auto;
    padding-top:50px;
`

W.ArticleContent = styled.div`
    p{
        padding:5px 0px;
        >img{
            margin: 10px auto;
            display:block;
        }
    }
`

W.ArticlePageSection = styled.section`
    background-color: #EEE;
    padding:25px 0px;
`

W.ArticlePageContainer = styled(WContainer)`
    flex-direction: column;
`


