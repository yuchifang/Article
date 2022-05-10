import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { GetArticle } from '../store/actions/articleAction'
import { WContainer, blue50 } from '../styles/General'
import { timestampToDate } from '../utils/utils'
import { RootState } from '../store/reducers/RootReducer'
import Tag from '../components/common/Tag'
import { MediaQueries } from '../styles/media'
import Spinner from '../components/common/Spinner'

type Location = {
    articleId: string
}
type ArticlePageProps = RouteComponentProps<{}, {}, Location>

type TagType = {
    added_by: string
    is_poi: boolean
    locked: number
    tag: string
}

type ArticleState = {
    status: string
    errorMsg: string
    body: string
    category?: string
    title?: string
    avatar?: string
    authorName?: string
    public_at?: string
    tags?: TagType[]
}

export default function ArticlePage({
    location: {
        state: { articleId },
    },
    history,
}: ArticlePageProps) {
    const dispatch = useDispatch()
    const authorList = useSelector((state: RootState) => state.WriterList)
    const articleList = useSelector((state: RootState) => state.Article)
    const {
        [articleId]: article,
    }: { [articleId: string]: ArticleState } = useSelector(
        (state: RootState) => state.Article
    )
    // @ts-ignore
    const authorName = authorList.pinkymini.AuthorName

    useEffect(() => {
        if (!articleList[articleId]) {
            dispatch(GetArticle(articleId, authorName))
        }
    }, [authorName, articleId])

    const handleTagClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        const target = e.target as Element
        const locationInfo = {
            pathname: `/ResultPage`,
            state: {
                articleId,
                searchValue: target.innerHTML,
            },
        }
        history.push(locationInfo)
        e.preventDefault()
        e.stopPropagation()
    }

    return (
        <>
            {article?.status === 'success' && (
                <WArticlePageSection>
                    <WArticlePageContainer>
                        <WArticleHeader>
                            {!!article.category &&
                                article.category !== '未分類' &&
                                article.category.length > 0 && (
                                    <WCategory>{article.category}</WCategory>
                                )}
                            <WArticleTitle>{article.title}</WArticleTitle>
                        </WArticleHeader>
                        <WArticleBlock>
                            <WArticleInfo>
                                <WArticleFigure>
                                    <WImg src={article.avatar} />
                                </WArticleFigure>
                                <WAuthorInfoContent>
                                    <WAuthor>作者:{article.authorName}</WAuthor>
                                    <WPublicTime>
                                        {timestampToDate(article?.public_at)}
                                    </WPublicTime>
                                    <WTagList>
                                        {!!article &&
                                            !!article?.tags &&
                                            article?.tags.length > 0 &&
                                            article?.tags.map(
                                                (
                                                    item: TagType,
                                                    index: number
                                                ) => (
                                                    <Tag
                                                        key={index}
                                                        iconBackgroundColor={
                                                            blue50
                                                        }
                                                        text={item.tag}
                                                        onClick={(e) =>
                                                            handleTagClick(e)
                                                        }
                                                    />
                                                )
                                            )}
                                    </WTagList>
                                </WAuthorInfoContent>
                            </WArticleInfo>
                            <WArticleContent
                                dangerouslySetInnerHTML={{
                                    __html: article.body,
                                }}
                            />
                        </WArticleBlock>
                    </WArticlePageContainer>
                </WArticlePageSection>
            )}
            {article?.status === 'loading' && <Spinner />}
            {article?.status === 'error' && <h1>Error</h1>}
        </>
    )
}

const WTagList = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const WArticleHeader = styled.div`
    max-width: 720px;
    padding: 1.563rem 0;
    margin: auto;
`

const WCategory = styled.p`
    font-size: 0.938rem;
    line-height: 1.25rem;
    margin: auto;
    font-weight: bold;
    padding-left: 0.625rem;
`

const WArticleTitle = styled.h1`
    font-size: 1.875rem;
    line-height: 2.188rem;
    margin: auto;
`

const WArticleInfo = styled.div`
    position: relative;
    left: 0;
    width: 100%;
    display: flex;
    padding: 0px 0.625rem 15px 0.625rem;
    box-sizing: border-box;
    justify-content: space-around;
    align-items: center;
    ${MediaQueries.DesktopMCSS`
        display:block;
        position: absolute;
        left: -16rem;
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
    margin-right: 0.625rem;
`

const WImg = styled.img``

const WAuthor = styled.p`
    margin-bottom: 0.313rem;
`

const WPublicTime = styled.p`
    margin-bottom: 0.313rem;
`

const WArticleBlock = styled.div`
    width: 100%;
    max-width 460px;
    position:relative;
    margin:auto;
    padding-top:3.125rem;
    ${MediaQueries.MobileSCSS`
        max-width:580px;
    `}
`

const WArticleContent = styled.div`
    width: 100%;
    padding: 0px 10px 0px 10px;
    box-sizing: border-box;
    * {
        max-width: 100%;
        display: inline-block;
        box-sizing: border-box;
        white-space: break-spaces;
    }
    p {
        width: 100%;
        padding: 0.313rem 0px;
        > img {
            margin: 0.625rem auto;
            display: block;
            width: 100%;
        }
    }
`

const WArticlePageSection = styled.section`
    background-color: #fefefe;
    padding: 1.563rem 0px;
`

const WArticlePageContainer = styled.div`
    ${WContainer};
    box-sizing: border-box;
    flex-direction: column;
`
