require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const validationErrors = require('celebrate').errors;
const cors = require('cors');
const helmet = require('helmet');

const { PORT, DATABASE_ADDRESS } = require('./utils/config');

const limiter = require('./middlewares/limiter');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/index');

const app = express();

mongoose.connect(DATABASE_ADDRESS);

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(limiter);
app.use(helmet());

app.use(router);

app.use(errorLogger);

app.use(validationErrors());
app.use(errorHandler);

app.listen(PORT);
