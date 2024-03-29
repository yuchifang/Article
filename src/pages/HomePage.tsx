import styled from 'styled-components'

import TopicBlock from '../components/common/TopicBlock/TopicBlock'
import { WContainer } from '../styles/General'
import { HeaderPageProps } from './HeaderPage'

export default function HomePage({ topicTitleList }: HeaderPageProps) {
    // console.log("topicTitleList", topicTitleList)

    return (
        <WHomePage>
            <WHomePageSection>
                <WHomePageContainer>
                    <TopicBlock
                        searchValue={topicTitleList[0].name}
                        rowsCount={3}
                        columnsCount={1}
                        showCarousel
                        showTitle
                    />
                </WHomePageContainer>
            </WHomePageSection>
            <WHomePageSection>
                <WHomePageContainer>
                    <TopicBlock
                        searchValue={topicTitleList[1].name}
                        rowsCount={2}
                        columnsCount={2}
                        showTitle
                        wrap
                    />
                </WHomePageContainer>
            </WHomePageSection>
            <WHomePageSection>
                <WHomePageContainer>
                    <TopicBlock
                        searchValue={topicTitleList[2].name}
                        showCarousel
                        rowsCount={4}
                        showTitle
                        columnsCount={1}
                    />
                </WHomePageContainer>
            </WHomePageSection>
        </WHomePage>
    )
}

const WHomePageContainer = styled.div`
    ${WContainer};
    flex-direction: column;
`

const WHomePageSection = styled.section`
    // >div:nth-child(even) {
    //     background-color: #eee;
    // }
`

const WHomePage = styled.div`
    > section:nth-child(even) {
        background-color: #efefef;
    }
`
