import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../services/axiosClient';

export default function ShowProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const ApiBaseUrl = import.meta.env.VITE_LARAVEL_API_BASE_URL;

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axiosClient(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  console.log(product);

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <div>
        {product.images.map((image) => (
          <img
            key={image.id}
            src={`${ApiBaseUrl}/${image.url}`}
            alt={`Product Image ${image.id}`}
          />
        ))}
      </div>
      <Link className="mx-auto" to="/create-product">
        Creation Another Product
      </Link>
    </div>
  );
}
