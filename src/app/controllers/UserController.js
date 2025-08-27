/*
 * store => Cadastrar / Adicionar
 * index => Listar vários
 * show => Exibir um
 * update => Atualizar um
 * delete => Remover um
 */
import { v4 } from 'uuid';
import * as Yup from 'yup';

import User from '../models/User.js';

class UserController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    const { name, email, password, admin } = req.body;

    const userExists = await User.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User with email already exists' });
    }

    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin: admin || false,
    });

    return res.status(201).json({
      id: user.id,
      name,
      email,
      admin,
    });
  }
  catch(error) {
    console.error(error); // para ver detalhes no console
    return res.status(500).json({ error: error.message });
  }
}

export default new UserController();
