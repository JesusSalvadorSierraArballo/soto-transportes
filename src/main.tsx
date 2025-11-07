import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import AuthLayout from './layouts/authLayout.tsx'
import Login from './pages/login/login.tsx'
import Post from './pages/post/post.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AuthLayout />}>
          <Route path="/post" element={<Post />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
