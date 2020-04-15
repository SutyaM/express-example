const express = require('express');
const morgan = require('morgan');
const app = express();

const loggerMiddleware = (req, res, next) => {
  console.log(req.method, req.path);
  next();
};

const authenticationMiddleware = (req, res, next) => {
  console.log('Authentication');
  res.locals.user = { username: 'Forge' };
  next();
};

const getRootHandler = (req, res) => {
  console.log(req.path, req.method, req.query);
  res.sendStatus(200);
};

const getUserHandler = (req, res) => {
  console.log('params:', req.params);
  res.status(400).send(`Dear ${res.locals.user.username}! It was a bad request` );
};

const redirectExampleHandler = (req, res) => {
  res.redirect('/')
};

const createIssue = (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
}

app.use(morgan('tiny'));
app.post(express.json());
app.use(loggerMiddleware);
app.use(authenticationMiddleware);
app.get('/', getRootHandler);
app.get('/user/:userId', getUserHandler);
app.get('/redirect-example', redirectExampleHandler);
app.post('/issue', createIssue);

app.listen(3000);
