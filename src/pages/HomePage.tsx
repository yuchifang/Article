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
    return (
        <W_HomePage>
            <W_HomePageSection>
                <W_HomePageContainer>
                    <TopicBlock
                        showTitle={true}
                        title={topicTitleList[0].name}
                        rowsCount={3}
                        columnsCount={1}
                    />
                </W_HomePageContainer>
            </W_HomePageSection>
            <W_HomePageSection>
                <W_HomePageContainer>
                    <TopicBlock
                        showTitle={true}
                        title={topicTitleList[1].name}
                        rowsCount={2}
                        columnsCount={2}
                        wrap={true}
                    />
                </W_HomePageContainer>
            </W_HomePageSection>
            <W_HomePageSection>
                <W_HomePageContainer>
                    <TopicBlock
                        showTitle={true}
                        title={topicTitleList[2].name}
                        rowsCount={4}
                        columnsCount={1}
                    />
                </W_HomePageContainer>
            </W_HomePageSection >
        </W_HomePage>
    )
}

const W_HomePageContainer = styled(WContainer)`
    flex-direction: column;   
`

const W_HomePageSection = styled.section`
    // >div:nth-child(even) {
    //     background-color: #eee;
    // }
`
const W_HomePage = styled.div`
    >div:nth-child(even) {
        background-color: #eee;
    }
`