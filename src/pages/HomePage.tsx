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
        <W.HomePage>
            <W.HomePageSection>
                <W.HomePageContainer>
                    <TopicBlock
                        showTitle={true}
                        title={topicTitleList[0].name}
                        rowsCount={3}
                        columnsCount={1}
                    />
                </W.HomePageContainer>
            </W.HomePageSection>
            <W.HomePageSection>
                <W.HomePageContainer>
                    <TopicBlock
                        showTitle={true}
                        title={topicTitleList[1].name}
                        rowsCount={2}
                        columnsCount={2}
                        wrap={true}
                    />
                </W.HomePageContainer>
            </W.HomePageSection>
            <W.HomePageSection>
                <W.HomePageContainer>
                    <TopicBlock
                        showTitle={true}
                        title={topicTitleList[2].name}
                        rowsCount={4}
                        columnsCount={1}
                    />
                </W.HomePageContainer>
            </W.HomePageSection >
        </W.HomePage>
    )
}

let W: { [key: string]: any } = {}

W.HomePageContainer = styled(WContainer)`
    flex-direction: column;   
`

W.HomePageSection = styled.section`
    // >div:nth-child(even) {
    //     background-color: #eee;
    // }
`

W.HomePage = styled.div`
    >section:nth-child(even) {
        background-color: #EFEFEF;
    }
`