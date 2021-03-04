import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { GetArticle } from '../store/actions/articleAction'
import { useDispatch, useSelector } from 'react-redux'
import { WContainer } from '../styles/General'
import { timestampToDate } from "../utils"
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
            <WArticlePageSection>
                <WArticlePageContainer>
                    <WArticleHeader>
                        {!!article.category && article.category !== "未分類" && article.category.length > 0 && <WCategory>{article.category}</WCategory>}
                        <WTitle>{article.title}</WTitle>
                    </WArticleHeader>
                    <WContent>
                        <WArticleInfo>
                            <WFigure>
                                <WImg src={article.avatar} />
                            </WFigure>
                            <WAuthor>
                                作者:{article.authorName}
                            </WAuthor>
                            <WPublic>
                                {timestampToDate(article?.public_at)}
                            </WPublic>
                            <WTagList>
                                {(!!article?.tags && article?.tags.length > 0) ? article?.tags.map((item: Tag, index: number) =>
                                    <WTag
                                        key={index}
                                        onClick={(e) => handleTagClick(e)}>
                                        {item.tag}
                                    </WTag>
                                ) : null}
                            </WTagList>
                        </WArticleInfo>
                        <WArticle dangerouslySetInnerHTML={{ __html: article.body }} />
                    </WContent>
                </WArticlePageContainer>
            </WArticlePageSection>
            : null
    )
}

const WTagList = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const WTag = styled.div`
    padding: 5px;
    border: 1px solid black;
    border-radius: 15px;
    line-height: 0.8;
    margin: 2px 5px;
    cursor: pointer;
`

const WArticleHeader = styled.div`
    max-width:720px;
    padding: 25px 0;
    margin:auto;
`
const WCategory = styled.p`
    font-size: 15px;
    line-height: 20px;
    margin:auto;
    font-weight: bold; 
    padding-left:10px;   
`

const WTitle = styled.h1`
    font-size: 30px;
    line-height: 35px;
    margin:auto;
`

const WArticleInfo = styled.div`
    position: absolute;
    left: -60%;
    width: 250px;
`

const WFigure = styled.figure`
    text-align: center;
    margin-bottom: 5px;
`

const WImg = styled.img`

`

const WAuthor = styled.p`
    margin-bottom:5px;
`

const WPublic = styled.p`
    margin-bottom:5px;
`

const WContent = styled.div`
    position:relative;
    max-width:580px;
    margin:auto;
    padding-top:50px;
`

const WArticle = styled.div`
    p{
        padding:5px 0px;
        >img{
            margin: 10px auto;
            display:block;
        }
    }
`

const WArticlePageSection = styled.section`
    background-color: #EEE;
    padding:25px 0px;
`

const WArticlePageContainer = styled(WContainer)`
    flex-direction: column;
`


