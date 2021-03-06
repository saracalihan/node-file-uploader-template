const express = require('express');

const routes = require('./routes');

const router = express.Router();

routes.forEach((route) => {
  const { prefix } = route;
  const subRouter = express.Router();
  route.inject(subRouter);
  router.use(prefix, subRouter);
});

module.exports = router;
