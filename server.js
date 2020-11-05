const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

server.use(logger);
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);
server.use((error, req, res, next) => {
  console.log('Error!', error);
})

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
function logger(req, res, next) {
  const seconds = new Date().getSeconds();

  if (seconds % 3 === 0) {
    res.status(403).json({ message: 'api is down....  pls. try again later!' });
  } else {
    next(0);
  }
}

module.exports = server;