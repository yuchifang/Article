import React, { PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'
import themes from './themes'

export default function GlobalComponent({ children }: PropsWithChildren<{}>) {
    return <ThemeProvider theme={themes}>{children}</ThemeProvider>
}
