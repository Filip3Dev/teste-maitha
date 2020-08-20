'use strict';

const controller = require('./contact.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/contact`,
  });

  router
    .get('/:contactId', controller.getOne)
    .get('/', controller.getAll)
    .post('/', controller.createOne)
    .put('/:contactId', controller.getOne)
    .delete('/:contactId', controller.deleteOne);

  return router;
};
