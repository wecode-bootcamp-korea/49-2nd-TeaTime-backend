const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const { myDataSource } = require("./src/models/dataSource");
const { errorHandler } = require("./src/utils/errorHandler");
const routers = require("./src/routers");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(routers);
app.use(errorHandler);

app.get("/ping", async (req, res) => {
  try {
    return res.status(200).json({
      message: "pong",
    });
  } catch (error) {
    console.log(error);
  }
});

const start = async () => {
  try {
    await myDataSource.initialize().then(() => console.log("Data Source has been initialized!"));

    const port = process.env.SERVER_PORT;
    app.listen(port, () => console.log(`server is listening in PORT ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
