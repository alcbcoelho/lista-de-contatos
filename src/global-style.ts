import { createGlobalStyle } from 'styled-components';

export const breakpoints = {
  minMobile: '320px',
  maxMobile: '575px',
  minSmallTablet: '576px',
  maxSmallTablet: '831px',
  //   maxSmallTablet: '767px',
  minLargeTablet: '832px',
  //   minLargeTablet: '768px',
  maxLargeTablet: '1023px'
};

export const colors = {
  lightGreen: '#c0ffab',
  green: '#34cf4d',
  lightGray: '#efefef',
  gray: '#9f9f9f'
};

export const containerMaxWidths = {
  default: '960px',
  mobile: '90%',
  tablet: '95%'
};

export default createGlobalStyle`
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
}

body {
  font-family: sans-serif;
  background-color: ${colors.lightGray};
}

h1 {
  text-align: center;
  margin: 24px 0;
}

.card {
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.125);
}

footer {
  padding: 16px 0;
  // background-color: ${colors.gray};
  border-top: 1px ${colors.gray} solid; 

  p {
    // color: #efefef;
    color: ${colors.gray};
    font-size: 0.75rem;
    text-align: center;
  }
}

button {
  cursor: pointer;

  &[disabled] {
    cursor: default;
  }
}
`;
