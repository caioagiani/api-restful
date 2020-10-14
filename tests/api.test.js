const request = require('supertest');
const app = require('../src/app');

describe('Create', () => {
  it('should create user session', async (done) => {
    const response = await request(app)
      .post('/user/create')
      .send({
        nome: 'Caio Agiani',
        email: `caio.agiani${Math.floor(Math.random() * 9999) + 1}@gmail.com`,
        senha: '123123123',
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

describe('Authentication', () => {
  it('should create session authentication', async (done) => {
    const response = await request(app).post('/login').send({
      email: 'caio.agiani14@gmail.com',
      senha: '123'
    });

    expect(response.status).toBe(200);
    done();
  });
});

describe('User', () => {
  it('should list user by id', async (done) => {
    const response = await request(app)
      .get('/user/5f877dc25d9f7b5c08f77c16')
      .send();

    expect(response.status).toBe(401);
    done();
  });
});
