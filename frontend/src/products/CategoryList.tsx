import React, { useEffect, useState } from 'react';
import { fetchCategories, Category } from './products.api';

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories()
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load categories');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading atelier collections...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map(category => (
        <div key={category.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold">{category.name}</h3>
          <p className="text-gray-600">{category.description}</p>
          <a href={`/customize/${category.slug}`} className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded">
            Customize {category.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
