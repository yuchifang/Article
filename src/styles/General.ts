import styled, { createGlobalStyle } from 'styled-components'
import { MediaQueries } from "../styles/media"
export const blue600 = "#1f292e"
export const blue400 = "#78909c";
export const blue100 = "#546e7a"
export const blue50 = "#e2f3f1"
export const WContainer = styled.div`
    max-width:1280px;
    display: flex;
    margin: auto;
    padding: 0 10px;
    ${MediaQueries.MobileCSS`
        padding: 0px 15px;
    `}
    ${MediaQueries.DesktopSCSS`
        padding: 0px 30px;
    `} 
    
`