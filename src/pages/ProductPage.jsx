import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../services/axiosClient';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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
            src={`http://127.0.0.1:8000/${image.url}`}
            alt={`Product Image ${image.id}`}
          />
        ))}
      </div>
    </div>
  );
}
