import React, { useState } from 'react';
import axios from 'axios';

interface CustomizationFormProps {
  category: any;
  onSubmit: (data: any, images: string[]) => void;
}

const CustomizationForm: React.FC<CustomizationFormProps> = ({ category, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (label: string, value: any) => {
    setFormData({ ...formData, [label]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append('image', file);

    try {
      const res = await axios.post('/api/media/upload', data);
      setImages([...images, res.data.data.url]);
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded bg-gray-50">
      <h3 className="text-lg font-bold">Customize your {category.name}</h3>
      {category.fields.map((field: any) => (
        <div key={field.id}>
          <label className="block text-sm font-medium">{field.label} {field.required && '*'}</label>
          {field.field_type === 'text' && (
            <input
              type="text"
              required={field.required}
              className="w-full border p-2 rounded"
              onChange={e => handleInputChange(field.label, e.target.value)}
            />
          )}
          {field.field_type === 'image' && (
            <input
              type="file"
              required={field.required}
              accept="image/*"
              className="w-full"
              onChange={handleImageUpload}
            />
          )}
        </div>
      ))}
      {uploading && <p className="text-sm text-blue-500">Uploading image...</p>}
      <button
        onClick={() => onSubmit(formData, images)}
        className="bg-black text-white px-4 py-2 rounded w-full"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CustomizationForm;
