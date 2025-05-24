import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    width:auto;
    height:auto;
    line-height: 1.6;
    background-color: #f5f5f5;
    color: #333;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  .leaflet-popup-content {
    min-width: 200px;
  }

  .leaflet-popup-content h3 {
    margin-bottom: 0.5rem;
  }

  .leaflet-popup-content p {
    margin: 0.2rem 0;
  }
`;

export default GlobalStyles;