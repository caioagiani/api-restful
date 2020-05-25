const request = require('supertest');
const app = require('../src/app');

describe('Authentication', () => {
  it('should create session authentication', async (done) => {
    const response = await request(app).post('/login').send({
      email: 'caio.agiani14@gmail.com',
      password: '123'
    });

    expect(response.status).toBe(200);
    done();
  });
});

describe('Login', () => {
  it('should create user session', async (done) => {
    const response = await request(app)
      .post('/user/create')
      .send({
        name: 'Caio Agiani',
        email: 'caio.agiani14@gmail.com',
        password: '123',
        telefones: [
          {
            numero: '999865802',
            ddd: '11'
          }
        ]
      });

    expect(response.status).toBe(200);
    done();
  });
});

describe('User', () => {
  it('should list user by id', async (done) => {
    const response = await request(app)
      .get('/user/5ec46b12bf6de842bc001b08')
      .send();

    expect(response.status).toBe(401);
    done();
  });
});
