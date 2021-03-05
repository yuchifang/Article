import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { PropsWithChildren } from 'react'
import themes from './themes'

const GlobalStyle = createGlobalStyle`
    *{
        margin:0px;
        padding:0px;
        list-style: none;
    }
`

export default function GlobalComponent({
    children,
}: PropsWithChildren<{}>) {
    return (
        <ThemeProvider theme={themes}>
            <GlobalStyle />
            {children}
        </ThemeProvider >
    )
}
