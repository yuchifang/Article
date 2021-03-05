import { css } from 'styled-components'

const size = {
    mobile: 500,
    desktopS: 980,
    desktopM: 1200,
    desktopL: 1440,

}

const mediaCSS = (size: number) => (...args: any[]) => css`
    @media screen and (min-width:${size}px){
        ${(css as any)(...args)}
    }
`

export const MediaQueries = {
    MobileCSS: mediaCSS(size.mobile),
    DesktopSCSS: mediaCSS(size.desktopS),
    DesktopMCSS: mediaCSS(size.desktopM),
    DesktopLCSS: mediaCSS(size.desktopL),
}