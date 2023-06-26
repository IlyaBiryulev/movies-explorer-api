require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const validationErrors = require('celebrate').errors;
const helmet = require('helmet');
const cors = require('./middlewares/cors');

const { PORT, DATABASE_ADDRESS } = require('./utils/config');

const limiter = require('./middlewares/limiter');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/index');

const app = express();

mongoose.connect(DATABASE_ADDRESS);

app.use(cors);

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
