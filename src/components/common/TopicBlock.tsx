import React, { useState, useMemo, useEffect } from 'react'
import {
    pipe,
    _filter,
    _slice,
    _sort,
    _log
} from '../../utils/utils'
import ArticleInfo from './ArticleInfo'
import { useSelector } from 'react-redux'
import { blue600, blue100, blue50 } from '../../styles/General'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons'
import { RootState } from '../../store/reducers/RootReducer'
import Tag from "./Tag"
import { MediaQueries } from "../../styles/media"

type ArticleProps = {
    articleId: string,
    avatar: string,
    category: string,
    public_at: string,
    sub_site_category: string,
    tags: string[],
    title: string,
    total_hits: string
}

export default function TopicBlock({
    filter = false,
    showTitle = true,
    title = "標題",
    blockNumber = 4,
    rowsCount = 4,
    columnsCount = 1,
    wrap = false,
    titlePlace = "left"
}) {

    const storeArticleList = useSelector((state: RootState) => state.WriterList)
    const propsArticleList = useMemo(() => {
        //@ts-ignore
        if (storeArticleList?.pinkymini?.actionStatus === "success") {
            return pipe( //1. 尋找所有文章的tag 或 title 是否符合title  2. 依據total hit 排列  3. 依據 rowsCount * columnsCount 要呈現幾個
                _filter((article: ArticleProps) => {
                    if (!!article && !article.title)
                        return article.tags.some((element: string) => element.toLowerCase() === title.toLowerCase())
                    if (article.title.toLowerCase().indexOf(title.toLowerCase()) > -1) return true
                }),
                _sort((articleA: ArticleProps, articleB: ArticleProps) => articleA.total_hits > articleB.total_hits ? -1 : 1),
                _slice(0, rowsCount * columnsCount)
                //@ts-ignore
            )(storeArticleList.pinkymini.articles)

        }
    }, [storeArticleList, title])

    const [filterList, setFilterList] = useState(false)
    const [articleInfoList, setArticleInfoList] = useState<ArticleProps[]>(propsArticleList)
    const [publicTimeActive, setPublicTimeActive] = useState(false)
    const [viewCountActive, setViewCountActive] = useState(true)

    useEffect(() => {
        setArticleInfoList(propsArticleList)
        setViewCountActive(true)
        setPublicTimeActive(false)
        setFilterList(false)
    }, [propsArticleList])


    const handlePublicTime = () => {
        setArticleInfoList(prevState => prevState.sort((articleA: ArticleProps, articleB: ArticleProps) =>
            Number(articleA.public_at) > Number(articleB.public_at) ? -1 : 1))
        setPublicTimeActive(true)
        setViewCountActive(false)
        setFilterList(prevState => !prevState)
    }

    const handleViewCount = () => {
        setArticleInfoList(prevState => prevState.sort((articleA: ArticleProps, articleB: ArticleProps) =>
            Number(articleA.total_hits) > Number(articleB.total_hits) ? -1 : 1))
        setViewCountActive(true)
        setPublicTimeActive(false)
        setFilterList(prevState => !prevState)
    }

    const handleFilterList = () => {
        setFilterList(prevState => !prevState)
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
            {showTitle && <WTopicTitle titlePlace={titlePlace}>{title}</WTopicTitle>}
            {filter &&
                <WFilterFeature>
                    <WFilterShowList show={filterList}>
                        <WFilterBlock onClick={() => handleFilterList()}>
                            <FontAwesomeIcon icon={faFilter} color={`${blue600}`} />
                            <WFilterText>篩選器</WFilterText>
                        </WFilterBlock>
                        <WFilterList >
                            <Tag
                                text="上傳時間"
                                handleClick={handlePublicTime}
                                iconStyle={publicTimeIconStyle}
                                // cancelIcon={faTimes}
                                isItemActive={publicTimeActive}
                                iconBackgroundColor={blue50}
                                iconColor={blue100}
                            />
                            <Tag
                                text="觀看次數"
                                handleClick={handleViewCount}
                                iconStyle={viewCountIconStyle}
                                // cancelIcon={faTimes}
                                isItemActive={viewCountActive}
                                iconBackgroundColor={blue50}
                                iconColor={blue100}
                            />
                        </WFilterList>
                    </WFilterShowList>
                </WFilterFeature>}
            <WArticleInfoBlock  //@ts-ignore
                wrap={wrap}>
                {articleInfoList?.length > 0 && articleInfoList.map(
                    //@ts-ignore
                    (articleInfo, index) => {
                        return <ArticleInfo
                            key={`${articleInfo.title + index}`}
                            blockNumber={rowsCount * columnsCount}
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
            </WArticleInfoBlock>
        </WTopicBlock >
    )
}

type WTopicTitleProps = {
    titlePlace: string
}

type WFilterListProps = {
    show: boolean
}

type WArticleInfoBlockProps = {
    wrap: boolean
}

type WFilterShowList = {
    show: boolean
}


const WTopicBlock = styled.div`
    padding: 25px 10px;
    ${MediaQueries.DesktopSCSS`
        padding:45px;
    `}
`

const WTopicTitle = styled.p<WTopicTitleProps>`
    text-align:${props => props.titlePlace};
    color:${blue600};
    font-weight: bold;
    font-size: 30px;
    line-height: 1;
    margin-bottom:30px;
`

const WFilterFeature = styled.div`
    display: flex;
    margin: 0 20px;
    flex-direction: column;
    align-items: flex-start;
    border-bottom: 1px solid #ddd;
    padding-bottom: 7px;
`

const WFilterBlock = styled.div`
    padding-bottom: 7px;
    margin-bottom:2px;
    cursor: pointer;
`

const WFilterShowList = styled.div<WFilterShowList>`
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
    margin: 0 10px;
    font-weight: bold;
`

const WArticleInfoBlock = styled.div<WArticleInfoBlockProps>`
    display: flex;
    justify-content: space-around;
    width:100%;
    flex-wrap:${props => props.wrap ? "wrap" : "nowrap"}
`