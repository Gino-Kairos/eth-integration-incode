const router = require("express").Router();

//Dir - Routes
const authRouter = require("./auth/route");
const accessRouter = require("./access/route");
const filesRouter = require("./files/route");

//all api routes
function routesApi(app) {
  //start api
  app.use("/api", router);

  //Routes
  router.use("/auth", authRouter);
  router.use("/access", accessRouter);
  router.use("/file", filesRouter);
}

module.exports = routesApi;
