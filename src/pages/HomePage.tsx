import styled from 'styled-components'
import React from 'react'
import {
    _filter,
    _log
} from '../utils/utils'
import TopicBlock from '../components/common/TopicBlock'
import { WContainer } from '../styles/General'
import { HeaderPageProps } from "./HeaderPage"

export default function HomePage({ topicTitleList }: HeaderPageProps) {


    // rowsCount
    // columnsCount
    // mode  /"Sticky" Spatial
    console.log("topicTitleList", topicTitleList)
    return (
        <WHomePage>
            <WHomePageSection>
                <WHomePageContainer>
                    <TopicBlock
                        showTitle={true}
                        title={topicTitleList[0].name}
                        rowsCount={3}
                        columnsCount={1}
                    />
                </WHomePageContainer>
            </WHomePageSection>
            <WHomePageSection>
                <WHomePageContainer>
                    <TopicBlock
                        showTitle={true}
                        title={topicTitleList[1].name}
                        rowsCount={2}
                        columnsCount={2}
                        wrap={true}
                    />
                </WHomePageContainer>
            </WHomePageSection>
            <WHomePageSection>
                <WHomePageContainer>
                    <TopicBlock
                        showTitle={true}
                        title={topicTitleList[2].name}
                        rowsCount={4}
                        columnsCount={1}
                    />
                </WHomePageContainer>
            </WHomePageSection >
        </WHomePage>
    )
}


const WHomePageContainer = styled(WContainer)`
    flex-direction: column;   
`

const WHomePageSection = styled.section`
    // >div:nth-child(even) {
    //     background-color: #eee;
    // }
`

const WHomePage = styled.div`
    >section:nth-child(even) {
        background-color: #EFEFEF;
    }
`