import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './Styles/GlobalStyle'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <GlobalStyles></GlobalStyles>
    <App />
  </BrowserRouter>,
)
