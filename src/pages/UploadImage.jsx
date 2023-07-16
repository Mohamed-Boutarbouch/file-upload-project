import { useForm } from 'react-hook-form';
import axiosClient from '../services/axiosClient';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function UploadImage() {
  const { register, handleSubmit } = useForm();
  const [productId, setProductId] = useState(null);

  async function storeImage(data) {
    try {
      const formData = new FormData();
      if (data.images && data.images.length > 0) {
        for (let i = 0; i < data.images.length; i++) {
          formData.append('images[]', data.images[i]);
        }
      }
      formData.append('name', data.name);
      formData.append('description', data.description);

      const response = await axiosClient.post('/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProductId(response.data.id);

      console.log('Your image upload is successful');
    } catch (error) {
      console.error(error);
    }
  }

  function submitHandler(data) {
    storeImage(data);
  }

  console.log(productId);

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter Product Name" {...register('name')} />
        </div>
        <div className="">
          <label htmlFor="description">Description</label>
          <textarea id="description" rows="4" {...register('description')}></textarea>
        </div>
        <label htmlFor="images">Upload Images</label>
        <input type="file" id="images" {...register('images')} accept="image/png" multiple={true} />
        <button>Upload</button>
      </form>
      {productId && <Link to={`/products/${productId}`}>See your uploaded image</Link>}
    </>
  );
}
