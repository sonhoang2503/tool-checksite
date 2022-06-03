require('dotenv').config({ path: './.env' });
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./helpers/errorHandler');
const cors = require('cors');
const router = require('./routes/status.route');

const app = express();

app.use(cors());

app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;
app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
});
