'use strict';

const Contacts = require('../../models/Contact');
let STATUS_CODE = require('http-status-codes');
let api = require('../../utils/snippet');

exports.getOne = async ctx => {
  try {
    const { contactId } = ctx.params;
    const contact = await Contacts.findById(contactId, '-password -_id -__v');
    let dataCall = await api.get(
      `${contact.address.city},${contact.address.state}`,
    );
    let textMessage = '';
    if (dataCall.temp == 18 || dataCall.temp < 18)
      textMessage = 'Você não gostaria de um chocolate quente?';
    if (dataCall.temp >= 30 && dataCall.condition_code == 32)
      textMessage = 'Recomendo fortemente você ir à praia com esse calor!';
    if (
      dataCall.temp >= 30 &&
      (dataCall.condition_code == 45 || dataCall.condition_code == 9)
    )
      textMessage = 'Um sorvete agora não seria nada mal!';
    if (
      dataCall.temp < 30 &&
      dataCall.temp > 18 &&
      dataCall.condition_code == 32
    )
      textMessage = 'Com um clima desse, uma atividade ao ar livre seria bom!';
    if (
      dataCall.temp < 30 &&
      dataCall.temp > 18 &&
      (dataCall.condition_code == 45 || dataCall.condition_code == 9)
    )
      textMessage = 'O clima de hoje sugere ver um bom filme!';
    ctx.assert(
      contact,
      STATUS_CODE.NOT_FOUND,
      "The requested contact doesn't exist",
    );
    ctx.status = 200;
    ctx.body = { contact, message: textMessage };
    return 0;
  } catch (error) {
    console.warn(error);
    ctx.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    ctx.body = null;
    return 0;
  }
};

exports.getAll = async ctx => {
  const { text } = ctx.request.query;
  try {
    if (text) {
      const users = await Contacts.find({
        $or: [
          { name: { $regex: text, $options: 'i' } },
          { 'address.state': { $regex: text, $options: 'i' } },
          { 'address.city': { $regex: text, $options: 'i' } },
          { 'address.street': { $regex: text, $options: 'i' } },
          { 'address.house': { $regex: text, $options: 'i' } },
          { email: { $regex: text, $options: 'i' } },
          { 'phones.number': { $regex: `/${text}/`, $options: 'i' } },
        ],
        deleted: false,
      });
      ctx.status = STATUS_CODE.OK;
      ctx.body = users;
      return 0;
    }
    const users = await Contacts.find({ deleted: false });
    ctx.status = STATUS_CODE.OK;
    ctx.body = users;
    return 0;
  } catch (error) {
    console.warn(error);
    ctx.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    ctx.body = null;
    return 0;
  }
};

exports.createOne = async ctx => {
  const { name, address = {}, phones, email = '' } = ctx.request.body;
  ctx.assert(name, 400, 'O contato precisa de um nome!');
  ctx.assert(phones, 400, 'Onde está o numero?');
  const newContact = {
    name,
    address,
    phones,
    email,
  };

  try {
    const contact = await Contacts.create(newContact);
    ctx.status = STATUS_CODE.OK;
    ctx.body = contact;
    return 0;
  } catch (error) {
    console.warn(error);
    ctx.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    ctx.body = null;
    return 0;
  }
};

exports.editOne = async ctx => {
  const { contactId } = ctx.params;
  const { name, address = {}, phones, email = '' } = ctx.request.body;
  ctx.assert(name, 400, 'O contato precisa de um nome!');
  ctx.assert(phones, 400, 'Onde está o numero?');
  const editedContact = { name, address, phones, email };
  try {
    const contact = await Contacts.findOneAndUpdate(contactId, editedContact);
    ctx.status = STATUS_CODE.OK;
    ctx.body = contact;
    return 0;
  } catch (error) {
    console.warn(error);
    ctx.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    ctx.body = null;
    return 0;
  }
};

exports.deleteOne = async ctx => {
  const { contactId } = ctx.params;
  ctx.assert(contactId, 400, 'Onde está o ID do contato?');
  try {
    const contact = await Contacts.findOneAndUpdate(
      contactId,
      {
        $set: { deleted: true },
      },
      { new: true },
    );
    ctx.status = STATUS_CODE.OK;
    ctx.body = contact;
    return 0;
  } catch (error) {
    console.warn(error);
    ctx.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    ctx.body = null;
    return 0;
  }
};
