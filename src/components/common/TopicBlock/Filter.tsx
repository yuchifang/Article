import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import Tag from "../Tag"
import { blue600, blue100, blue50 } from '../../../styles/General'
import { useState, useEffect } from 'react'
import { ArticleProps, DefaultPageStateType, defaultPageState } from './TopicBlock'

export default function Filter({
    setArticleInfoFilteredList,
    ArticleInfoList,
    setPageState,
}: {
    setArticleInfoFilteredList: (value: React.SetStateAction<ArticleProps[]>) => void,
    setPageState: (value: React.SetStateAction<DefaultPageStateType>) => void,
    ArticleInfoList: ArticleProps[],
}) {

    const [filterListOpen, setFilterListOpen] = useState<boolean>(false)
    const [publicTimeActive, setPublicTimeActive] = useState<boolean>(false)
    const [viewCountActive, setViewCountActive] = useState<boolean>(true)

    useEffect(() => {
        setArticleInfoFilteredList?.(ArticleInfoList)
        setViewCountActive(true)
        setPublicTimeActive(false)
        setFilterListOpen(false)
        setPageState?.(defaultPageState)
    }, [ArticleInfoList])

    const handleFilterList = () => {
        setFilterListOpen(prevState => !prevState)
    }

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

    let publicTimeIconStyle = {
        "vertical-align": "middle",
        "display": publicTimeActive ? "inline-block" : "none"
    }

    let viewCountIconStyle = {
        "vertical-align": "middle",
        "display": viewCountActive ? "inline-block" : "none"
    }

    return (
        <WFilterFeature>
            <WFilterShowList show={filterListOpen}>
                <WFilterBlock onClick={() => handleFilterList()}>
                    <FontAwesomeIcon icon={faFilter} color={`${blue600}`} />
                    <WFilterText>篩選器</WFilterText>
                </WFilterBlock>
                <WFilterList >
                    <Tag
                        text="觀看次數"
                        handleClick={handleViewCountFilter}
                        iconBackgroundColor={blue50}
                        isItemActive={viewCountActive}
                        TextColor={blue100}
                    />
                    <Tag
                        text="上傳時間"
                        handleClick={handlePublicTimeFilter}
                        iconBackgroundColor={blue50}

                        isItemActive={publicTimeActive}
                        TextColor={blue100}
                    />
                </WFilterList>
            </WFilterShowList>
        </WFilterFeature>
    )
}

const WFilterFeature = styled.div`
    display: flex;
    margin: 0 1.25rem;
    flex-direction: column;
    align-items: flex-start;
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.438rem;
`

const WFilterShowList = styled.div<{ show: boolean }>`
    transition: max-height .5s .3s;
    max-height:${props => props.show ? "60px" : "20px"};
    overflow: hidden;
`

const WFilterText = styled.p`
    display: inline-block;
    margin: 0 0.625rem;
    font-weight: bold;
`

const WFilterBlock = styled.div`
    padding-bottom: 0.438rem;
    margin-bottom:0.125rem;
    cursor: pointer;
`

const WFilterList = styled.div`
    transition: all .3s .5s;
    display:flex;
`