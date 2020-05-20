const { createToken } = require('./TokenController');
const bcryptjs = require('bcryptjs');

const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const { tokenId } = req;
    const { user_id } = req.params;

    if (user_id != tokenId) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    const user = await User.findById({ _id: user_id });

    user.password = undefined;
    user.__v = undefined;

    return res.status(200).json(user);
  },

  async store(req, res) {
    const { email } = req.body;

    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      return res.status(200).json({ mensagem: 'E-mail já existente.' });
    }

    const user = await User.create(req.body);

    user.password = undefined;
    user.__v = undefined;

    return res.json(user);
  },

  async show(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }, '+password');

    if (!user) {
      return res
        .status(200)
        .json({ mensagem: 'Usuário e/ou senha inválidos.' });
    }

    const checkPass = await bcryptjs.compare(password, user.password);

    if (!checkPass) {
      return res
        .status(200)
        .json({ mensagem: 'Usuário e/ou senha inválidos.' });
    }

    const token = createToken({
      id: user.id,
      name: user.name,
      email,
    });

    await User.findOneAndUpdate(
      { _id: user._id },
      { token, lastLoginAt: Date.now() }
    );

    user.password = undefined;
    user.__v = undefined;
    user.token = token;

    return res.json(user);
  },
};
