'use strict';

const controller = require('./link.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/links`,
  });

  router
    .get('/:linkId', controller.getOne)
    .get('/', controller.getAll)
    .post('/', controller.createOne);

  return router;
};
