import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";

import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";

import { GlobalStyle } from "./styles/global";
import { CycleProvider } from "./Context/CycleContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleProvider>
          <Router />
        </CycleProvider>
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  )
}