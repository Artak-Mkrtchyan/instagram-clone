import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
  ${reset};
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${(props) => props.theme.colors.bg};
    color: ${(props) => props.theme.colors.black};
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  a {
    color: ${(props) => props.theme.colors.blue};
    text-decoration: none;
  }
  input:focus {
    outline: none;
  }
`;
