import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import TopicBlock from '../components/common/TopicBlock/TopicBlock'
import { MediaQueries } from '../styles/media'

type LocationProp = {
    searchValue: string
}
type ResultPageProps = RouteComponentProps<{}, {}, LocationProp>

export default function ResultPage({
    location: {
        state: { searchValue },
    },
}: ResultPageProps) {
    return (
        <WResultPageContainer>
            <TopicBlock
                searchValue={searchValue}
                rowsCount={2}
                columnsCount={100}
                filter
                showTitle
                hasPagination
                titlePlace="center"
                wrap
                titleHasIcon
            />
        </WResultPageContainer>
    )
}

const WResultPageContainer = styled.div`
    max-width: 1280px;
    margin: auto;
    padding: 0 0px;
    ${MediaQueries.MobileSCSS`
        padding: 0px 0.938rem;
    `}
    ${MediaQueries.MobileLCSS`
        padding: 0px 1.875rem;
    `}
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
`
