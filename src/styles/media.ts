import { css } from 'styled-components'

const size = {
    mobile: 500,
    mobileM: 720,
    desktopS: 980,
    desktopM: 1200,
    desktopL: 1440,

}

const mobileMediaCSS = (size: number) => (...args: any[]) => css`
    @media screen and (max-width:${size}px){
        ${(css as any)(...args)}
    }
`
const desktopMediaCSS = (size: number) => (...args: any[]) => css`
    @media screen and (min-width:${size}px){
        ${(css as any)(...args)}
    }
`

export const MediaQueries = {
    MobileSCSS: mobileMediaCSS(size.mobile),
    MobileMCSS: mobileMediaCSS(size.mobileM),
    DesktopSCSS: desktopMediaCSS(size.desktopS),
    DesktopMCSS: desktopMediaCSS(size.desktopM),
    DesktopLCSS: desktopMediaCSS(size.desktopL),
}