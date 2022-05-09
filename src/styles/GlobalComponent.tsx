import React from "react";
import { ThemeProvider } from "styled-components";
import { PropsWithChildren } from "react";
import themes from "./themes";

export default function GlobalComponent({ children }: PropsWithChildren<{}>) {
  return <ThemeProvider theme={themes}>{children}</ThemeProvider>;
}
