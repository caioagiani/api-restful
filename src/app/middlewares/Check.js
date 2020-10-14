const Yup = require('yup');

module.exports = {
  async SingIn(req, res, next) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        senha: Yup.string().required()
      });

      await schema.validate(req.body, { abortEarly: false });

      return next();
    } catch (error) {
      return res.json({ error });
    }
  },
  async SingUp(req, res, next) {
    try {
      const schema = Yup.object().shape({
        nome: Yup.string().required(),
        email: Yup.string().email().required(),
        senha: Yup.string().required(),
        telefones: Yup.array(
          Yup.object().shape({
            numero: Yup.string().required(),
            ddd: Yup.string().required()
          })
        )
      });

      await schema.validate(req.body, { abortEarly: false });

      return next();
    } catch (error) {
      return res.json({ error });
    }
  }
};
