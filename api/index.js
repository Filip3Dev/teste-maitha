'use strict';

const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const render = require('koa-ejs');

const { apiVersion } = require('../config').server;
const baseName = path.basename(__filename);

const controlerContact = require('./contact/contact.controller');

exports.applyApiMiddleware = function(app) {
  const router = new Router({
    prefix: `/api/${apiVersion}`,
  });

  // Require all the folders and create a sub-router for each feature api
  fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== baseName)
    .forEach(file => {
      const api = require(path.join(__dirname, file))(Router);
      router.use(api.routes());
    });

  app.use(router.routes()).use(router.allowedMethods());
};