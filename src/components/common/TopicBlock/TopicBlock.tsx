import { useState, useMemo, useEffect } from 'react'
import {
    pipe,
    _filter,
    _slice,
    _sort,
    _log
} from '../../../utils/utils'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import { RootState } from '../../../store/reducers/RootReducer'
import { blue600, blue100, blue50 } from '../../../styles/General'
import ArticleInfo from '../ArticleInfo'
import Tag from "../Tag"
import { MediaQueries } from "../../../styles/media"
import Pagination from "../Pagination"
import { useRWD } from '../../../utils/hooks'
import Carousel from '../Carousel'
import Filter from './Filter'

export type ArticleProps = {
    articleId: string,
    avatar: string,
    category: string,
    public_at: string,
    sub_site_category: string,
    tags: string[],
    title: string,
    total_hits: string

}

export type DefaultPageStateType = {
    currentPage: number,
    maxIndex: number,
    minIndex: number
}

type TopicBlockProps = {
    searchValue: string,
    rowsCount: number,
    columnsCount: number,

    showCarousel?: boolean,
    showTitle?: boolean,
    wrap?: boolean,
    filter?: boolean,
    hasPagination?: boolean,
    titlePlace?: string,
}

const singlePageItemCount = 10

export const defaultPageState = {
    currentPage: 1,
    maxIndex: singlePageItemCount,
    minIndex: 0
}


export default function TopicBlock({
    filter = false,
    showTitle = true,
    searchValue = "標題",
    rowsCount = 4,
    columnsCount = 1,
    wrap = false,
    titlePlace = "left",
    hasPagination = false,
    showCarousel = false

}: TopicBlockProps) {

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


    const [articleInfoFilteredList, setArticleInfoFilteredList] = useState<ArticleProps[]>(ArticleInfoList)

    const [pageState, setPageState] = useState<DefaultPageStateType>(defaultPageState)

    const showPagination = articleInfoFilteredList.length / singlePageItemCount > 1 ? true : false

    const handleChange = (page: number) => {
        setPageState({
            currentPage: page,
            maxIndex: singlePageItemCount * page,
            minIndex: singlePageItemCount * (page - 1)
        })
    }

    return (
        <WTopicBlock>
            {showTitle && <WTopicTitle titlePlace={titlePlace}>{searchValue}</WTopicTitle>}
            {
                ArticleInfoList.length > 0 &&
                <>
                    {filter &&
                        <Filter
                            ArticleInfoList={ArticleInfoList}
                            setPageState={setPageState}
                            setArticleInfoFilteredList={setArticleInfoFilteredList} />
                    }
                    <WArticleInfoBlock wrap={wrap}>
                        {articleInfoFilteredList?.length > 0 &&
                            <>
                                {(device === "PC" || !showCarousel)
                                    && articleInfoFilteredList.map(
                                        (articleInfo, index) => {
                                            if (pageState.maxIndex >= index + 1 && index + 1 > pageState.minIndex)
                                                return <ArticleInfo
                                                    key={`${articleInfo.title + index}`}
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
                                        {({ AnimationBlock, AnimationItemBlock }: {
                                            AnimationBlock: any,
                                            AnimationItemBlock: any,

                                        }) =>
                                            <AnimationBlock>
                                                {articleInfoFilteredList.map((articleInfo, index) =>
                                                    <AnimationItemBlock>
                                                        <ArticleInfo
                                                            key={`${articleInfo.title + index}`}
                                                            title={articleInfo.title}
                                                            index={index}
                                                            articleId={articleInfo.articleId}
                                                            publicAt={articleInfo.public_at}
                                                            views={articleInfo.total_hits}

                                                            category={articleInfo.category}
                                                        />
                                                    </AnimationItemBlock>
                                                )}
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

const WArticleInfoBlock = styled.div<{ wrap: boolean }>`
    display: flex;
    justify-content: space-around;
    width:100%;
    flex-wrap:${props => props.wrap ? "wrap" : "nowrap"}
`