import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import Tag from "../Tag"
import { blue600, blue100, blue50 } from '../../../styles/General'

export default function Filter({
    onClickFilter,
    onClickPublicTime,
    onClickFilterList,
    filterListOpen,
    publicTimeActive,
    viewCountActive
}: {
    onClickFilter: () => void,
    onClickPublicTime: () => void,
    onClickFilterList: () => void,
    filterListOpen: boolean,
    publicTimeActive: boolean,
    viewCountActive: boolean
}) {



    return (
        <WFilterFeature>
            <WFilterShowList show={filterListOpen}>
                <WFilterBlock onClick={() => onClickFilterList()}>
                    <FontAwesomeIcon icon={faFilter} color={`${blue600}`} />
                    <WFilterText>篩選器</WFilterText>
                </WFilterBlock>
                <WFilterList >
                    <Tag
                        text="觀看次數"
                        onClick={onClickFilter}
                        iconBackgroundColor={blue50}
                        isItemActive={viewCountActive}
                        TextColor={blue100}
                    />
                    <Tag
                        text="上傳時間"
                        onClick={onClickPublicTime}
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