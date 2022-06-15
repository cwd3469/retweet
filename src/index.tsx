import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import { Provider, ReactReduxContext } from 'react-redux';
import App from './pages';
import './assets/common/reset.scss';

const container = document.getElementById('root');
const root = createRoot(container as Element);

const app = (
  <Provider store={store} context={ReactReduxContext}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

root.render(app);
