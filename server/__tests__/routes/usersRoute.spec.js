const request = require('supertest');
const server = require('../../api/server');
const firebase = require('../firebaseApp');

let headers
beforeAll(async (done) => {

  headers = {
    'Authorization': await firebase.getToken,
    'Content-Type': 'application/json'
  }
  done()
})

describe('userRoute', () => {
  describe('/api/user/info/:id', () => {
  
    const id = "w5iY6dJDISWE17ZbaO72QZWLTi62";
    
    it ('should return status code 200 OK', async () => {
      const expected = 200;
      const res = await request(server).get(`/api/user/info/${id}`).set(headers);
      expect(res.status).toEqual(expected);
    })

    it ('should return JSON', async () => {
      const res = await request(server).get(`/api/user/info/${id}`).set(headers);
      expect(res.type).toEqual("application/json");
    })

    it('should return 404 when no user', async () => {
      const noID = 1500
      const expected = 404;
      const res = await request(server).get(`/api/user/info/${noID}`).set(headers);
      expect(res.status).toEqual(expected)
    })

    it('should return no user message when no user', async () => {
      const noID = 1500
      const expected = { message: "That user doesnt exist" };
      const res = await request(server).get(`/api/user/info/${noID}`).set(headers);
      expect(res.body).toEqual(expected)
    })
  })
})
  