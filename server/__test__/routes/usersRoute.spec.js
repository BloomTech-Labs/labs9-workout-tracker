const request = require('supertest');
const server = require('../../api/server');


//User Tests

describe('userRoute', () => {
    describe('/api/user/info/:id', () => {
    
      const id = 2;
      it ('should return status code 200 OK', async () => {
        const expected = 200;
        const res = await request(server).get(`/api/user/info/${id}`);
        expect(res.status).toEqual(expected);
      })
      it ('should return JSON', async () => {
        const res = await request(server).get(`/api/user/info/${id}`);
        expect(res.type).toEqual("application/json");
      })
      it('should return 404 when no user', async () => {
        const noID = 1500
        const expected = 404;
        const res = await request(server).get(`/api/user/info/${noID}`);
        expect(res.status).toEqual(expected)
      })
      it('should return no user message when no user', async () => {
        const noID = 1500
        const expected = { message: "That user doesnt exist" };
        const res = await request(server).get(`/api/user/info/${noID}`);
        expect(res.body).toEqual(expected)
      })
    })
  })
  