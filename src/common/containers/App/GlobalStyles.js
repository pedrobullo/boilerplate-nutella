import { createGlobalStyle } from 'styled-components';

const colors = {
  fontColor: '#f1f1f1',
  bgColor: '#212121',
};

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    color: ${colors.fontColor};
    background-color: ${colors.bgColor};
  }
`;

export default GlobalStyles;
