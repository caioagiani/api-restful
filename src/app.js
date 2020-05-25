const { connect } = require('mongoose');
const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(routes);

(async () => {
  await connect(process.env.MONGO_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
})();

module.exports = server;
