import * as Yup from 'yup';
import Order from '../schemas/Order.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import User from '../models/User.js';

class OrderController {
    async store(req, res) {
        const schema = Yup.object({
            products: Yup.array().required().of(
                Yup.object({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                })
            ),

        });

        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        // if (!req.file) {
        //     return res.status(400).json({ error: 'File is required' });
        // }
        const { products } = req.body;

        const productsIds = products.map((product) => product.id);

        const findProducts = await Product.findAll({
            where: {
                id: productsIds,
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name'],
                },
            ],
        });

        const formattedProducts = findProducts.map(product => {
            const productIndex = products.findIndex(item => item.id === product.id);


            const newProtuct = {
                id: product.id,
                name: product.name,
                category: product.category.name,
                price: product.price,
                url: product.url,
                quantity: products[productIndex].quantity,
            };
            return newProtuct;
        });

        const order = {
            user: {
                id: req.userId,
                name: req.userName,
            },
            products: formattedProducts,
            status: 'Pedido realizado',
        };

        const createdOrder = await Order.create(order);


        return res.status(201).json({ createdOrder });
    }

    async index(req, res) {
        const orders = await Order.find();

        return res.json(orders);
    }

    async update(req, res) {
        const schema = Yup.object({
            status: Yup.string().required(),
        });

        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const { admin: isAdmin } = await User.findByPk(req.userId);

        if (!isAdmin) {
            return res.status(401).json({ error: 'Usuário não autorizado' });
        }


        const { id } = req.params;
        const { status } = req.body;

        try {
            await Order.updateOne({ _id: id }, { status });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }

        return res.json({ message: 'Status updated sucessfully' });
    }


}

export default new OrderController();
