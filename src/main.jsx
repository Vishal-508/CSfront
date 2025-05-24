import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);



// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import { ThemeProvider } from "styled-components";
// import store from "./redux/store";
// import theme from "./styles/theme";
// import GlobalStyles from "./styles/GlobalStyles";
// import AppRouter from "./routes/AppRouter";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <ThemeProvider theme={theme}>
//       <GlobalStyles />
//       <AppRouter />
//     </ThemeProvider>
//   </Provider>
// );
