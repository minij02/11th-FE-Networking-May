import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import './app/index.css'
import { TanstackProvider } from './app/providers/QueryClientProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanstackProvider>
      <RouterProvider router={router} />
    </TanstackProvider>
  </StrictMode>
);