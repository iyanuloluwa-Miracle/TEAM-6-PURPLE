const express = require("express");
const sequelize = require("./config/database");
const { notFoundHandler, errorHandler } = require("./middlewares/errorHandler");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/", async (req, res, next) => {
  res.send({ message: " Welcome to Team-6-Purple Api" });
});

app.use("/api/v1/", require("./routes/api.route"));
app.use("/api/v1/", require("./routes/itinerary.route"));
app.use("/api/v1/", require("./routes/hotel.route"));

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
