const { verify } = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authentication } = req.headers;

  if (!authentication) {
    return res.status(401).json({ mensagem: 'Não autorizado.' });
  }

  const [, token] = authentication.split(' ');

  try {
    verify(token, process.env.SECRET_JWT, (err, decoded) => {
      if (err) {
        return res.status(401).json({ mensagem: 'Não autorizado.' });
      }

      if (decoded.expiresIn < Date.now()) {
        return res.status(401).json({ mensagem: 'Sessão inválida.' });
      }

      req.tokenId = decoded.id;
      req.tokenName = decoded.name;
      req.tokenEmail = decoded.email;

      return next();
    });
  } catch (error) {
    return res.status(401).json({ mensagem: 'Não autorizado.' });
  }
};
