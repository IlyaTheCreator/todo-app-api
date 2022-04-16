const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const logger = require("morgan");
const fs = require("fs");
const path = require('path');

const sequelize = require("./db/database");
const cardRoutes = require("./routes/cards");
const listRoutes = require("./routes/lists");
const swaggerJsdoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 8080;

sequelize.sync().then(() => {
  console.log("db is ready");
});

// Swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Yandex Test Todo API",
      version: "1.0.0",
      description: "A simple API for managing todo lists",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./docs/*.js"],
};

// Initializing swagger jsdoc
const specs = swaggerJsdoc(options);

const app = express();

// Defining logging (file and console)
const operationsLogStream = fs.createWriteStream(
  __dirname + "/logs/" + "operations.log",
  { flags: "a" }
);
app.use(logger("common", { stream: operationsLogStream }));
app.use(logger("dev"));

app.use(cors());
app.use(express.json());
app.use("/api", cardRoutes);
app.use("/api", listRoutes);

// Defining a separate route for docs page
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// put ui build in folder ui-build
app.use(express.static(path.join(__dirname, 'ui-build')))
app.get('/*', (req, res) => res.sendFile(`${__dirname}/ui-build/index.html`));

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
