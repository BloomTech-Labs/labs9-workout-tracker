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

describe('authRoute', () => {
  describe('/api/login', () => {
  
    const id = "w5iY6dJDISWE17ZbaO72QZWLTi62";
    
    it ('should return status code 404', async () => {
      const expected = 404;
      const res = await request(server).get(`/api/user/info/23fedsfwe`).set(headers);
      expect(res.status).toEqual(expected);
    })

    it ('should return status code 500', async () => {
      const expected = 500;

      const wrongHeaders = {
            'Authorization': "df4w9f8b249f742bf9",
            'Content-Type': 'application/json'
      }

      const res = await request(server).get(`/auth/login`).set(wrongHeaders);
      expect(res.status).toEqual(expected);
    })

    it ('should return status code 401', async () => {
        const expected = 401;
  
        const res = await request(server).get(`/auth/login`);
        expect(res.status).toEqual(expected);
    })

    it ('should return status code 200', async () => {
        const expected = 200;
        const res = await request(server).post(`/auth/login`).set(headers);
        expect(res.status).toEqual(expected);
    })

    it ('should return status code 200', async () => {
        const expected = 200;
        const res = await request(server).post(`/auth/login`).set(headers);
        expect(res.status).toEqual(expected);
    })

  })
})
  