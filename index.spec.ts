const request = require('supertest');
const {app} = require('./src/serverOff');

/* A test that uses a mock to simulate the behavior of a repository. */
describe('Teste Principal', () => {
  it('Teste caminho principal', async () => {
    const res = await request(app).get("/")
    
    expect(res.body).toHaveProperty('message')
  })
})