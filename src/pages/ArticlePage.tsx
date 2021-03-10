import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { GetArticle } from '../store/actions/articleAction'
import { useDispatch, useSelector } from 'react-redux'
import { WContainer } from '../styles/General'
import { timestampToDate } from "../utils/utils"
import { RouteComponentProps } from "react-router-dom"
import { RootState } from '../store/reducers/RootReducer'
import { blue50 } from "../styles/General"
import Tag from "../components/common/Tag"
import { MediaQueries } from '../styles/media'

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
        const target = e.target as Element;
        console.log({ target });
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
                        {!!article.category && article.category !== "未分類" && article.category.length > 0 &&
                            <WCategory>{article.category}</WCategory>}
                        <WArticleTitle>{article.title}</WArticleTitle>
                    </WArticleHeader>
                    <WArticleBlock>
                        <WArticleInfo>
                            <WArticleFigure>
                                <WImg src={article.avatar} />
                            </WArticleFigure>
                            <WAuthorInfoContent>
                                <WAuthor>作者:{article.authorName}</WAuthor>
                                <WPublicTime>{timestampToDate(article?.public_at)}</WPublicTime>
                                <WTagList>
                                    {(!!article?.tags && article?.tags.length > 0) ? article?.tags.map((item: Tag, index: number) =>
                                        <Tag
                                            iconBackgroundColor={blue50}
                                            text={item.tag}
                                            key={index}
                                            handleClick={(e) => handleTagClick(e)} />
                                    ) : null}
                                </WTagList>
                            </WAuthorInfoContent>
                        </WArticleInfo>
                        <WArticleContent dangerouslySetInnerHTML={{ __html: article.body }} />
                    </WArticleBlock>
                </WArticlePageContainer>
            </WArticlePageSection>
            : null
    )
}


const WTagList = styled.div`
    display: flex;
    flex-wrap: wrap;
`

// const  WTag = styled.div`
//     padding: 0.313rem;
//     border: 1px solid black;
//     border-radius: 0.938rem;
//     line-height: 0.8;
//     margin: 2px 0.313rem;
//     cursor: pointer;
// `

const WArticleHeader = styled.div`
    max-width:720px;
    padding: 1.563rem 0;
    margin:auto;
`

const WCategory = styled.p`
    font-size: 0.938rem;
    line-height: 1.25rem;
    margin:auto;
    font-weight: bold; 
    padding-left:0.625rem;   
`

const WArticleTitle = styled.h1`
    font-size: 1.875rem;
    line-height: 2.188rem;
    margin:auto;
`

const WArticleInfo = styled.div`
  
    position: relative;
    left:0;
    width:auto;
    display:flex;
    margin-bottom: 15px;
    justify-content: space-around;
    align-items: center;
    ${MediaQueries.DesktopLCSS`
        display:block;
        position: absolute;
        left: -20rem;
        width: 15.625rem;
    `}
`

const WAuthorInfoContent = styled.div`
    display: flex;
    flex-direction: column;
   
`

const WArticleFigure = styled.figure`
    text-align: center;
    margin-bottom: 0.313rem;
`

const WImg = styled.img`

`

const WAuthor = styled.p`
    margin-bottom:0.313rem;
`

const WPublicTime = styled.p`
    margin-bottom:0.313rem;
`

const WArticleBlock = styled.div`
    position:relative;
    max-width:580px;
    margin:auto;
    padding-top:3.125rem;
`

const WArticleContent = styled.div`
    p{
        padding:0.313rem 0px;
        >img{
            margin: 0.625rem auto;
            display:block;
        }
    }
`

const WArticlePageSection = styled.section`
    background-color: #FEFEFE;
    padding:1.563rem 0px;
`

const WArticlePageContainer = styled.div`
    ${WContainer};
    box-sizing: border-box;
    flex-direction: column;
`


