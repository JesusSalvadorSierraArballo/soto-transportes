// import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';

// import 'primereact/resources/primereact.min.css'
// import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/themes/lara-light-blue/theme.css';


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import AuthLayout from './layouts/authLayout.tsx';
import Login from './pages/login/login.tsx';
import Post from './pages/post/post.tsx';
import { store } from './store/index.ts';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<AuthLayout />}>
            <Route path="/post" element={<Post />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to="/login" replace={true} />}
          />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
    </Provider>
  </StrictMode>
);
