import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import UploadImage from './pages/UploadImage';
import ProductPage from './pages/ProductPage';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Link className="mx-auto" to="/upload-image">
          Upload your image here
        </Link>
      ),
    },
    {
      path: '/upload-image',
      element: <UploadImage />,
    },
    {
      path: '/products/:id',
      element: <ProductPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
