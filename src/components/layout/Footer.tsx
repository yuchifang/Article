import React from 'react'
import styled from 'styled-components'
import { blue50, blue100 } from '../../styles/General'
export default function Footer() {
    return (
        <W.FooterSection>
            <W.FooterTitle>&copy;文章由文科少女寫程式提供</W.FooterTitle>
        </W.FooterSection>
    )
}

let W: { [key: string]: any } = {}

W.FooterSection = styled.div`
    padding:30px;
    background-color:${blue50}
`
W.FooterTitle = styled.p`
    color:${blue100}
`