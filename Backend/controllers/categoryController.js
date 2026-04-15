import CategoryModel from '../models/categoryModel.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.getAll();
        res.json({ success: true, data: categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

export const getCategoryItems = async (req, res) => {
    try {
        const items = await CategoryModel.getItemsByCategory(req.params.id);
        res.json({ success: true, data: items });
    } catch (error) {
        console.error('Error fetching category items:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};