import { createBrowserRouter } from 'react-router-dom';
import { WeatherPage } from '@/pages/weather';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WeatherPage />,
  },
]);