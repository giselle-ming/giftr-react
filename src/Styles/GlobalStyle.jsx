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
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
  font-family: (--font-family);
}

h1{
    padding: 1rem;
}
button{
    cursor:pointer;
}

`;