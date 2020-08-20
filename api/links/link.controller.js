'use strict';

const generateId = require('../../utils/generateId.util');
const strings = require('../../utils/random.util');
const mongoose = require('mongoose');
const Link = require('../../models/Link');

/**
 * Mock database, replace this with your db models import, required to perform query to your database.
 */
const db = {
  users: [
    {
      id: 'bff28903-042e-47c2-b9ee-07c3954989ec',
      name: 'Marco',
      created_at: 1558536830937,
    },
    {
      id: 'dca01a32-36e6-4886-af75-8e7caa0162a9',
      name: 'Leonardo',
      created_at: 1558536843742,
    },
    {
      id: 'dca01a32-36e6-4886-af75-8e7caa0162a9',
      name: 'Berta',
      created_at: 1558536863550,
    },
  ],
};

exports.getOne = async data => {
  const res = await Link.findOne({ short_link: data });
  return res;
};

exports.getAll = async ctx => {
  ctx.status = 200;
  ctx.body = db.users;
};

exports.createOne = async data => {
  const { link, pixel } = data;
  const id = generateId();
  let short = strings.makeid(8);
  const checkLink = await Link.findOne({ short_link: short });
  if (checkLink) {
    short = strings.makeid(8);
  }
  const newlink = {
    id,
    pixel,
    link,
    short_link: short,
  };
  let linker = new Link(newlink);
  await linker.save();
  return linker;
};

exports.updateViews = async data => {
  let views = data.views;
  const res = await Link.findByIdAndUpdate(data._id, { $set: { views: views + 1 } });
  return res
};
