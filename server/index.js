const express = require('express');
const cors = require('cors');

const sequelize = require('./db/database');
const cardRoutes = require("./routes/cards");
const listRoutes = require("./routes/lists");

const PORT = process.env.PORT || 8080;

sequelize.sync().then(() => console.log('db is ready'));

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', cardRoutes);
app.use('/api', listRoutes);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
