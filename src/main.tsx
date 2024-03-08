import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home } from './pages/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
)
