import { useForm } from 'react-hook-form';
import axiosClient from '../services/axiosClient';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CreateProduct() {
  const { register, handleSubmit } = useForm();
  const [productId, setProductId] = useState(null);

  async function submitHandler(formData) {
    try {
      const { data } = await axiosClient.post('/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProductId(data.id);

      console.log('Your image upload is successful');
    } catch (error) {
      console.error(error);
    }
  }

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
        <input type="file" id="images" {...register('images[]')} accept="image/*" multiple={true} />
        <button>Upload</button>
      </form>
      {productId && <Link to={`/products/${productId}`}>See your uploaded image</Link>}
    </>
  );
}
