import React, { useState, useMemo } from 'react'
import {
    pipe,
    _filter,
    _slice,
    _sort,
    _log
} from '../../utils'
import ArticleInfo from './ArticleInfo'
import { useSelector } from 'react-redux'
import { blue600, blue100, blue50 } from '../../styles/General'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons'
import { RootState } from '../../store/reducers/RootReducer'
import Tag from "./Tag"

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

    const articleList = useSelector((state: RootState) => state.WriterList)
    const topicArticleList = useMemo(() => {
        //@ts-ignore
        if (articleList?.pinkymini?.actionStatus === "success") {
            return pipe(
                _filter((article: ArticleProps) => article.tags.some((element: string) => element.toLowerCase() === title.toLowerCase())),
                _sort((articleA: ArticleProps, articleB: ArticleProps) => articleA.total_hits > articleB.total_hits ? -1 : 1),
                _slice(0, rowsCount * columnsCount)
                //@ts-ignore
            )(articleList.pinkymini.articles)

        }
    }, [articleList, title])

    const [filterList, setFilterList] = useState(false)
    const [articleInfoList, setArticleInfoList] = useState<ArticleProps[]>(topicArticleList)
    const [publicTimeActive, setPublicTimeActive] = useState(false)
    const [viewCountActive, setViewCountActive] = useState(false)

    const handlePublicTime = () => {
        setArticleInfoList(prevState => prevState.sort((articleA: ArticleProps, articleB: ArticleProps) =>
            Number(articleA.public_at) > Number(articleB.public_at) ? -1 : 1))
        setPublicTimeActive(true)
        setViewCountActive(false)
        // setFilterList(prevState => !prevState)
    }

    const handleViewCount = () => {
        setArticleInfoList(prevState => prevState.sort((articleA: ArticleProps, articleB: ArticleProps) =>
            Number(articleA.total_hits) > Number(articleB.total_hits) ? -1 : 1))
        setViewCountActive(true)
        setPublicTimeActive(false)
        // setFilterList(prevState => !prevState)
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
        <W_TopicBlock>
            {showTitle && <W_TopicTitle titlePlace={titlePlace}>{title}</W_TopicTitle>}
            {filter &&
                <W_FilterFeature>
                    <W_FilterBlock onClick={() => handleFilterList()}>
                        <FontAwesomeIcon icon={faFilter} color={`${blue600}`} />
                        <W_FilterText>篩選器</W_FilterText>
                    </W_FilterBlock>
                    <W_FilterList show={filterList}>
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
                    </W_FilterList>
                </W_FilterFeature>}
            <W_ArticleInfoBlock  //@ts-ignore
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
            </W_ArticleInfoBlock>
        </W_TopicBlock>
    )
}

type W_TopicTitleProps = {
    titlePlace: string
}

type W_FilterListProps = {
    show: boolean
}

type W_ArticleInfoBlockProps = {
    wrap: boolean
}

const W_TopicBlock = styled.div`
    padding: 25px 10px;
    @media (min-width: 980px) {
        padding:45px;
    }
`

const W_TopicTitle = styled.p<W_TopicTitleProps>`
    text-align:${props => props.titlePlace};
    color:${blue600};
    font-weight: bold;
    font-size: 30px;
    margin-bottom:30px;
`

const W_FilterFeature = styled.div`
    display: flex;
    margin: 0 20px;
    flex-direction: column;
    align-items: flex-start;
`

const W_FilterBlock = styled.div`
    cursor: pointer;
    margin: 0 0 10px 0px;
`

const W_FilterList = styled.div<W_FilterListProps>`
    // height:${props => props.show ? "27px" : "0px"};
    // visibility: ${props => props.show ? "unset" : "hidden"};
    transition: all .3s .5s;
    display:${props => props.show ? "flex" : "none"};;
`

const W_FilterText = styled.p`
    display: inline-block;
    margin: 0 10px;
    font-weight: bold;
`

const W_ArticleInfoBlock = styled.div<W_ArticleInfoBlockProps>`
    display: flex;
    justify-content: space-around;
    width:100%;
    flex-wrap:${props => props.wrap ? "wrap" : "nowrap"}
`