import { css } from 'styled-components'
import { MediaQueries } from '../styles/media'

export const blue600 = '#1f292e'
export const blue400 = '#78909c'
export const blue100 = '#546e7a'
export const blue50 = '#e2f3f1'

export const WContainer = css`
    max-width: 1280px;
    display: flex;
    margin: auto;
    padding: 0 0.625rem;
    ${MediaQueries.MobileSCSS`
        padding: 0px 0.938rem;
    `}
    ${MediaQueries.MobileLCSS`
        padding: 0px 1.875rem;
    `}
`
