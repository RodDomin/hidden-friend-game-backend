export default {
  secret: process.env.JWT_SECRET || 'example',
  expiresIn: '1d',
};
