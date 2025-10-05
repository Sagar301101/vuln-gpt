import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import "./indes.css";
import theme from "./config/theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
          <Routes />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
