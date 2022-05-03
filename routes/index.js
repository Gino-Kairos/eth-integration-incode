const router = require("express").Router();

//Dir - Routes
const authRouter = require("./auth/route");

//all api routes
function routesApi(app) {
  //start api
  app.use("/api", router);

  //Routes
  router.use("/auth", authRouter);
}

module.exports = routesApi;
