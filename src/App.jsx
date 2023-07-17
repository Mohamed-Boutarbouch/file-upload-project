import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import CreateProduct from './pages/CreateProduct';
import ShowProduct from './pages/ShowProduct';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Link className="mx-auto" to="/create-product">
          Go to Product Creation Page
        </Link>
      ),
    },
    {
      path: '/create-product',
      element: <CreateProduct />,
    },
    {
      path: '/products/:id',
      element: <ShowProduct />,
    },
  ]);

  return <RouterProvider router={router} />;
}
