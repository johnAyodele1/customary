import { Request, Response } from 'express';
import * as productsService from './products.service.js';

export const listCategories = async (req: Request, res: Response) => {
  try {
    const categories = await productsService.getAllCategories();
    res.json({ status: 'success', data: categories });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch categories' });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const category = await productsService.getCategoryBySlug(req.params.slug);
    if (!category) {
      return res.status(404).json({ status: 'error', message: 'Category not found' });
    }
    res.json({ status: 'success', data: category });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch category' });
  }
};

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, fields } = req.body;
    const category = await productsService.createCategory(name, slug, description, fields);
    res.status(201).json({ status: 'success', data: category });
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(400).json({ status: 'error', message: 'Category slug already exists' });
    }
    res.status(500).json({ status: 'error', message: 'Failed to create category' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await productsService.removeCategory(Number(id));
    res.json({ status: 'success', message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to delete category' });
  }
};
