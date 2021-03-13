import styled from 'styled-components'
import { blue50, blue100 } from '../../styles/General'
export default function Footer() {
    return (
        <WFooterSection>
            <WFooterTitle>&copy;文章由文科少女寫程式提供</WFooterTitle>
        </WFooterSection>
    )
}


const WFooterSection = styled.div`
    padding:1.875rem;
    background-color:${blue50}
`
const WFooterTitle = styled.p`
    color:${blue100}
`