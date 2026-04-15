import pool from '../config/database.js';

const CategoryModel = {
    async getAll() {
        const [rows] = await pool.execute('SELECT id, name, description FROM categories ORDER BY name');
        return rows;
    },

    async getItemsByCategory(categoryId) {
        const [rows] = await pool.execute(`
            SELECT m.*, v.id as vendor_id, v.business_name as vendor_name
            FROM menu_items m
            JOIN vendors v ON m.vendor_id = v.id
            WHERE m.category_id = ? AND m.is_available = true AND v.is_active = true
            ORDER BY v.business_name, m.name
        `, [categoryId]);
        return rows;
    }
};

export default CategoryModel;