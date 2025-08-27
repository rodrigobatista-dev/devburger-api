/*
 * store => Cadastrar / Adicionar
 * index => Listar vários
 * show => Exibir um
 * update => Atualizar um
 * delete => Remover um
 */
import { v4 } from 'uuid';

import User from '../models/User.js';

class UserController {
  async store(req, res) {
    const { name, email, password_hash, admin } = req.body;
    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash,
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
