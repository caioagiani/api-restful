const bcryptjs = require('bcryptjs');
const { createToken } = require('../middlewares/Token');

const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const { tokenId } = req;
    const { user_id } = req.params;

    if (user_id != tokenId) {
      return res.status(401).json({ mensagem: 'Não autorizado.' });
    }

    const user = await User.findById({ _id: user_id });

    user.senha = undefined;

    return res.status(200).json(user);
  },

  async store(req, res) {
    const { email } = req.body;

    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      return res.status(400).json({ mensagem: 'E-mail já existente.' });
    }

    const user = await User.create(req.body);

    user.senha = undefined;

    return res.status(200).json(user);
  },

  async show(req, res) {
    const { email, senha } = req.body;

    const user = await User.findOne({ email }, '+senha');

    if (!user) {
      return res
        .status(400)
        .json({ mensagem: 'Usuário e/ou senha inválidos.' });
    }

    const checkPass = bcryptjs.compareSync(senha, user.senha);

    if (!checkPass) {
      return res
        .status(400)
        .json({ mensagem: 'Usuário e/ou senha inválidos.' });
    }

    const token = createToken({
      id: user.id,
      nome: user.nome,
      email
    });

    await User.findOneAndUpdate(
      { _id: user._id },
      { token, data_ultima_atualizacao: Date.now() }
    );

    user.senha = undefined;
    user.token = token;

    return res.status(200).json(user);
  }
};
