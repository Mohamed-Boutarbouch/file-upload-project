import { useForm } from 'react-hook-form';
import axiosClient from '../services/axiosClient';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CreateProduct() {
  const { register, handleSubmit } = useForm();
  const [productId, setProductId] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (e) => {
    const files = [...e.target.files];

    const images = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        images.push(ev.target.result);

        if (images.length === files.length) {
          setPreviewImages(images);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  async function submitHandler(formData) {
    try {
      const { data } = await axiosClient.post('/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProductId(data.id);

      alert('Your image upload is successful');
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
        <input
          type="file"
          id="images"
          {...register('images[]')}
          accept="image/*"
          multiple={true}
          onChange={handleImageChange}
        />
        {previewImages.length > 0 && (
          <div>
            <p>Preview:</p>
            {previewImages.map((image, index) => (
              <img key={index} src={image} alt={`Preview ${index}`} width="100" height="100" />
            ))}
          </div>
        )}
        <button>Upload</button>
      </form>
      {productId && <Link to={`/products/${productId}`}>See your uploaded image</Link>}
    </>
  );
}
