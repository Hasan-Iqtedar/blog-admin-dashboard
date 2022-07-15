import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import App from './App';
import LoginPage from './components/LoginPage';
import RequireAuth from './components/RequireAuth';

import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <HashRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <RequireAuth>
              <App />
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </HashRouter>
  </AuthProvider>
);
