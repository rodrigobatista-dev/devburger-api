import * as Yup from 'yup';
import Category from '../models/Category.js';

class CategoryController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }


    const { name } = req.body;

    const categoryExists = await Category.findOne({
      where: {
        name,
      }
    });

    if (categoryExists) {
      return res.status(400).json({ error: 'Category already exists' });
    }


    const category = await Category.create({
      name,

    });
    return res.status(201).json({ 
      id: category.id,
      name: category.name

     });
  }

  async index(req, res) {
    const categories = await Category.findAll();

    return res.json(categories);
  }
}

export default new CategoryController();
