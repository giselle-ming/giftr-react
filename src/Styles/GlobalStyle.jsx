import { createGlobalStyle } from 'styled-components'
export const GlobalStyles = createGlobalStyle`
:root {
  font-synthesis: none;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  font-family: (--font-family);
}

h1{
    padding: 1rem;
}
button{
    cursor:pointer;
}
ul{
    list-style-type: none;
}

.container{
    width: min(85em, 100%);
    margin: 0 auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    
}

`;

export default GlobalStyles;