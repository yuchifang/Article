import React from 'react'
import styled from 'styled-components'
import { blue50, blue100 } from '../../styles/General'
export default function Footer() {
    return (
        <W_FooterSection>
            <W_FooterTitle>&copy;文章由文科少女寫程式提供</W_FooterTitle>
        </W_FooterSection>
    )
}

const W_FooterSection = styled.div`
    padding:30px;
    background-color:${blue50}
`
const W_FooterTitle = styled.p`
    color:${blue100}
`