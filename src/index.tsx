import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.jsx';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './services/store.js';

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));

reportWebVitals();