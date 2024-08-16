import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ContextProvider from './Components/ContextProvider.jsx';
import RegisterPage from './Routes/RegisterPage.jsx';
import LoginPage from './Routes/LoginPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
       <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
)
