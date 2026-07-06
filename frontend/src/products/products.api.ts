import axios from 'axios';

const API_BASE = '/api/products';

export interface CategoryField {
  id: number;
  category_id: number;
  field_type: 'text' | 'image' | 'select';
  label: string;
  required: boolean;
  options: any;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  fields: CategoryField[];
}

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${API_BASE}`);
  return response.data.data;
};

export const fetchCategoryBySlug = async (slug: string): Promise<Category> => {
  const response = await axios.get(`${API_BASE}/${slug}`);
  return response.data.data;
};
