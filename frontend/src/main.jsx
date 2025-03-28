import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Toaster } from 'sonner'; // Corrected import for Toaster
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

// Persistor for storing Redux state
const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Redux Provider to manage global state */}
    <Provider store={store}>
      {/* PersistGate ensures Redux state is persisted */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster position="top-right" richColors /> {/* Improved Toaster settings */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
