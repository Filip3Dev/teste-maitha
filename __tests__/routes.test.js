const request = require('supertest');
const server = require('../server');
beforeAll(async () => {
  console.log('Jest starting!');
});
afterAll(() => {
  console.log('server closed!');
});
describe('basic route tests', () => {
  test('GET list contacts', async () => {
    const response = await request(server.callback()).get('/api/v1/contact/');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  test('GET one contact', async () => {
    const { body } = await request(server.callback()).get('/api/v1/contact/');
    const response2 = await request(server.callback()).get(
      `/api/v1/contact/${body[0]._id}`,
    );
    expect(response2.status).toBe(200);
    expect(response2.body).toBeInstanceOf(Object);
  });
  test('EDIT one contact', async () => {
    const { body } = await request(server.callback()).get('/api/v1/contact/');
    const response2 = await request(server.callback()).put(
      `/api/v1/contact/${body[0]._id}`,
      body[0],
    );
    expect(response2.status).toBe(200);
    expect(response2.body).toBeInstanceOf(Object);
  });
  test('DELETE one contact', async () => {
    const { body } = await request(server.callback()).get('/api/v1/contact/');
    const response2 = await request(server.callback()).delete(
      `/api/v1/contact/${body[0]._id}`,
    );
    expect(response2.status).toBe(200);
    expect(response2.body).toBeInstanceOf(Object);
  });
});
