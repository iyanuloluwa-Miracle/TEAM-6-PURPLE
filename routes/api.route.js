// routes/api.route.js
const router = require("express").Router();
const userController = require("../controllers/userController");


router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working " });
});

router.post("/users/register", userController.register);
router.post("/users/login", userController.login);



module.exports = router;