import React, { useState, useMemo } from 'react'
import {
    pipe,
    _filter,
    _slice,
    _sort,
    _log
} from '../../utils'
import ArticleInfo from './ArticleInfo.tsx'
import { useSelector } from 'react-redux'
import { blue600, blue100, blue50 } from '../../styles/General'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons'
import Tag from "./Tag.tsx"


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
    const articleList = useSelector(state => state.WriterList)
    const topicArticleList = useMemo(() => {
        if (articleList?.pinkymini?.actionStatus === "success") {
            return pipe(
                _filter(article => article.tags.some(element => element.toLowerCase() === title.toLowerCase())),
                _sort((articleA, articleB) => articleA.total_hits > articleB.total_hits ? -1 : 1),
                _slice(0, rowsCount * columnsCount)
            )(articleList.pinkymini.articles)

        }
    }, [articleList, title])
    const [filterList, setFilterList] = useState(false)

    const [articleInfoList, setArticleInfoList] = useState(topicArticleList)

    const [publicTimeActive, setPublicTimeActive] = useState(false)
    const [viewCountActive, setViewCountActive] = useState(false)

    const handlePublicTime = () => {
        setArticleInfoList(prevState => prevState.sort((articleA, articleB) => Number(articleA.public_at) > Number(articleB.public_at) ? -1 : 1))
        setPublicTimeActive(true)
        setViewCountActive(false)
        // setFilterList(prevState => !prevState)
    }

    const handleViewCount = () => {
        setArticleInfoList(prevState => prevState.sort((articleA, articleB) => Number(articleA.total_hits) > Number(articleB.total_hits) ? -1 : 1))
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
        <WHomPageTopicBlock>
            {showTitle && <WTopicTitle titlePlace={titlePlace}>{title}</WTopicTitle>}
            {filter &&
                <WFilterFeature>
                    <WFilterBlock onClick={() => handleFilterList()}>
                        <FontAwesomeIcon icon={faFilter} color={`${blue600}`} />
                        <WFilterText>篩選器</WFilterText>
                    </WFilterBlock>
                    <WFilterList show={filterList}>
                        <Tag
                            text="上傳時間"
                            handleClick={handlePublicTime}
                            iconStyle={publicTimeIconStyle}
                            cancelIcon={faTimes}
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
                </WFilterFeature>}
            <WArticleBlock wrap={wrap}>
                {articleInfoList?.length > 0 && articleInfoList.map((articleInfo, index) => {
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
            </WArticleBlock>
        </WHomPageTopicBlock>
    )
}

const WHomPageTopicBlock = styled.div`
    padding: 25px 10px;
    @media (min-width: 980px) {
        padding:45px;
    }
`

const WTopicTitle = styled.p`
    text-align:${props => props.titlePlace};
    color:${blue600};
    font-weight: bold;
    font-size: 30px;
    margin-bottom:30px;
`

const WFilterFeature = styled.div`
    display: flex;
    margin: 0 20px;
    flex-direction: column;
    align-items: flex-start;
`

const WFilterBlock = styled.div`
    cursor: pointer;
    margin: 0 0 10px 0px;
`

const WFilterList = styled.div`
    // height:${props => props.show ? "27px" : "0px"};
    // visibility: ${props => props.show ? "unset" : "hidden"};
    transition: all .3s .5s;
    display:${props => props.show ? "flex" : "none"};;
`

const WFilterText = styled.p`
    display: inline-block;
    margin: 0 10px;
    font-weight: bold;
`

const WArticleBlock = styled.div`
    display: flex;
    justify-content: space-around;
    width:100%;
    flex-wrap:${props => props.wrap ? "wrap" : "nowrap"}
`