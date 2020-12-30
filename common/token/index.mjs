import jwt from 'jsonwebtoken';

export default {

  getFromRequest: (req) => {
    if (req && req.headers && req.headers['x-token']) {
      return req.headers['x-token'];
    }
    if (req && req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  },

  encode: (data, secret) => {
    return jwt.sign({ data }, secret, { expiresIn: '6h' });
  },

  decode: (token, secret) => {
    return jwt.verify(token, secret).data;
  }
}