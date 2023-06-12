const {
  PORT = 3000,
  DATABASE_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

module.exports = {
  PORT,
  DATABASE_ADDRESS,
};
