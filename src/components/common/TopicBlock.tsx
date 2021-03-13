import { useState, useMemo, useEffect } from 'react'
import {
    pipe,
    _filter,
    _slice,
    _sort,
    _log
} from '../../utils/utils'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import { RootState } from '../../store/reducers/RootReducer'
import { blue600, blue100, blue50 } from '../../styles/General'
import ArticleInfo from './ArticleInfo'
import Tag from "./Tag"
import { MediaQueries } from "../../styles/media"
import Pagination from "./Pagination"
import { useRWD } from '../../utils/hooks'
import Carousel from '../common/Carousel'


type ArticleProps = {
    articleId: string,
    avatar: string,
    category: string,
    public_at: string,
    sub_site_category: string,
    tags: string[],
    title: string,
    total_hits: string
    showCarousel?: boolean
}

type DefaultPageState = {
    currentPage: number,
    maxIndex: number,
    minIndex: number
}

const singlePageItemCount = 10

const defaultPageState = {
    currentPage: 1,
    maxIndex: singlePageItemCount,
    minIndex: 0
}


export default function TopicBlock({
    filter = false,
    showTitle = true,
    searchValue = "標題",
    blockCount = 4,
    rowsCount = 4,
    columnsCount = 1,
    wrap = false,
    titlePlace = "left",
    hasPagination = false,
    showCarousel = false
}) {
    const device = useRWD()
    const storeArticleList = useSelector((state: RootState) => state.WriterList)
    const ArticleInfoList = useMemo(() => {
        //@ts-ignore
        if (storeArticleList?.pinkymini?.actionStatus === "success") {
            return pipe( //1. 尋找所有文章的tag 或 title 是否符合title  2. 依據total hit 排列  3. 依據 rowsCount * columnsCount 要呈現幾個
                _filter((article: ArticleProps) => {
                    if (!!article && !!article.title)
                        if (article.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) return true
                    return article.tags.some((element: string) => element.toLowerCase() === searchValue.toLowerCase())
                }),
                _sort((articleA: ArticleProps, articleB: ArticleProps) => articleA.total_hits > articleB.total_hits ? -1 : 1),
                _slice(0, rowsCount * columnsCount)
                //@ts-ignore
            )(storeArticleList.pinkymini.articles)

        }
    }, [storeArticleList, searchValue])

    const [filterListOpen, setFilterListOpen] = useState<boolean>(false)
    const [articleInfoFilteredList, setArticleInfoFilteredList] = useState<ArticleProps[]>(ArticleInfoList)
    const [publicTimeActive, setPublicTimeActive] = useState<boolean>(false)
    const [viewCountActive, setViewCountActive] = useState<boolean>(true)
    const [pageState, setPageState] = useState<DefaultPageState>(defaultPageState)

    const showPagination = articleInfoFilteredList.length / singlePageItemCount > 1 ? true : false

    //每次點選不同的header主題 需要重新render
    useEffect(() => {
        setArticleInfoFilteredList(ArticleInfoList)
        setViewCountActive(true)
        setPublicTimeActive(false)
        setFilterListOpen(false)
        setPageState(defaultPageState)
    }, [ArticleInfoList])


    const handlePublicTimeFilter = () => {
        setArticleInfoFilteredList(prevState => prevState.sort((articleA: ArticleProps, articleB: ArticleProps) =>
            Number(articleA.public_at) > Number(articleB.public_at) ? -1 : 1))
        setPublicTimeActive(true)
        setViewCountActive(false)
        setFilterListOpen(prevState => !prevState)
    }

    const handleViewCountFilter = () => {
        setArticleInfoFilteredList(prevState => prevState.sort((articleA: ArticleProps, articleB: ArticleProps) =>
            Number(articleA.total_hits) > Number(articleB.total_hits) ? -1 : 1))
        setViewCountActive(true)
        setPublicTimeActive(false)
        setFilterListOpen(prevState => !prevState)
    }

    const handleFilterList = () => {
        setFilterListOpen(prevState => !prevState)
    }

    const handleChange = (page: number) => {
        setPageState({
            currentPage: page,
            maxIndex: singlePageItemCount * page,
            minIndex: singlePageItemCount * (page - 1)
        })
    }

    let publicTimeIconStyle = {
        "vertical-align": "middle",
        "display": publicTimeActive ? "inline-block" : "none"
    }

    let viewCountIconStyle = {
        "vertical-align": "middle",
        "display": viewCountActive ? "inline-block" : "none"
    }


    return (
        <WTopicBlock>
            {showTitle && <WTopicTitle titlePlace={titlePlace}>{searchValue}</WTopicTitle>}
            {
                ArticleInfoList.length > 0 &&
                <>
                    {filter &&
                        <WFilterFeature>
                            <WFilterShowList show={filterListOpen}>
                                <WFilterBlock onClick={() => handleFilterList()}>
                                    <FontAwesomeIcon icon={faFilter} color={`${blue600}`} />
                                    <WFilterText>篩選器</WFilterText>
                                </WFilterBlock>
                                <WFilterList >
                                    <Tag
                                        text="上傳時間"
                                        handleClick={handlePublicTimeFilter}
                                        iconStyle={publicTimeIconStyle}
                                        // cancelIcon={faTimes}
                                        isItemActive={publicTimeActive}
                                        iconBackgroundColor={blue50}
                                        iconColor={blue100}
                                    />
                                    <Tag
                                        text="觀看次數"
                                        handleClick={handleViewCountFilter}
                                        iconStyle={viewCountIconStyle}
                                        // cancelIcon={faTimes}
                                        isItemActive={viewCountActive}
                                        iconBackgroundColor={blue50}
                                        iconColor={blue100}
                                    />
                                </WFilterList>
                            </WFilterShowList>
                        </WFilterFeature>}
                    <WArticleInfoBlock wrap={wrap}>
                        {articleInfoFilteredList?.length > 0 &&
                            <>
                                {(device === "PC" || !showCarousel) && articleInfoFilteredList.map(
                                    (articleInfo, index) => {
                                        if (pageState.maxIndex >= index + 1 && index + 1 > pageState.minIndex)
                                            return <ArticleInfo
                                                key={`${articleInfo.title + index}`}
                                                blockCount={rowsCount * columnsCount}
                                                rowsCount={rowsCount}
                                                title={articleInfo.title}
                                                category={articleInfo.category}
                                                index={index}
                                                articleId={articleInfo.articleId}
                                                publicAt={articleInfo.public_at}
                                                views={articleInfo.total_hits}
                                            />
                                    }
                                )}
                                {device === "Mobile" && showCarousel &&
                                    <Carousel carouselArr={articleInfoFilteredList} >
                                        {({ AnimationBlock, AnimationItemBlock, GetDimensionBlock }: {
                                            AnimationBlock: any,
                                            AnimationItemBlock: any,
                                            GetDimensionBlock: any
                                        }) =>
                                            <AnimationBlock>
                                                {articleInfoFilteredList.map((articleInfo, index) =>
                                                    <AnimationItemBlock>
                                                        <ArticleInfo
                                                            key={`${articleInfo.title + index}`}
                                                            title={articleInfo.title}
                                                            category={articleInfo.category}
                                                            index={index}
                                                            articleId={articleInfo.articleId}
                                                            publicAt={articleInfo.public_at}
                                                            views={articleInfo.total_hits}
                                                        />
                                                        <GetDimensionBlock />
                                                    </AnimationItemBlock>
                                                )}
                                                {articleInfoFilteredList.map((articleInfo, index) =>
                                                    <ArticleInfo
                                                        key={`${articleInfo.title + index}`}
                                                        title={articleInfo.title}
                                                        category={articleInfo.category}
                                                        index={index}
                                                        articleId={articleInfo.articleId}
                                                        publicAt={articleInfo.public_at}
                                                        views={articleInfo.total_hits}
                                                    />)}
                                            </AnimationBlock>
                                        }
                                    </Carousel>
                                }
                            </>
                        }
                    </WArticleInfoBlock>
                    {(hasPagination && showPagination) &&
                        <Pagination
                            currentPage={pageState.currentPage}
                            singlePageItemCount={singlePageItemCount}
                            ListLength={articleInfoFilteredList.length}
                            handleChange={handleChange} />}
                </>
            }
            {
                ArticleInfoList.length === 0 && <h1>找不到文章</h1>
            }
        </WTopicBlock >
    )
}


const WTopicBlock = styled.div`
    width:100%;
    padding: 1.563rem 0.625rem;
    box-sizing: border-box;
    ${MediaQueries.MobileLCSS`
        padding:2.813rem;
    `}
`

const WTopicTitle = styled.p<{ titlePlace: string }>`
    text-align:${props => props.titlePlace};
    color:${blue600};
    font-weight: bold;
    font-size: 1.875rem;
    line-height: 1;
    margin-bottom:1.875rem;
`

const WFilterFeature = styled.div`
    display: flex;
    margin: 0 1.25rem;
    flex-direction: column;
    align-items: flex-start;
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.438rem;
`

const WFilterBlock = styled.div`
    padding-bottom: 0.438rem;
    margin-bottom:0.125rem;
    cursor: pointer;
`

const WFilterShowList = styled.div<{ show: boolean }>`
    transition: max-height .5s .3s;
    max-height:${props => props.show ? "60px" : "20px"};
    overflow: hidden;
`

const WFilterList = styled.div`
    transition: all .3s .5s;
    display:flex;
`

const WFilterText = styled.p`
    display: inline-block;
    margin: 0 0.625rem;
    font-weight: bold;
`

const WArticleInfoBlock = styled.div<{ wrap: boolean }>`
    display: flex;
    justify-content: space-around;
    width:100%;
    flex-wrap:${props => props.wrap ? "wrap" : "nowrap"}
`