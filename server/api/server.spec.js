/*
- when making a GET to the `/` endpoint 
  the API should respond with status code 200 
  and the following JSON object: `{ api: 'running' }`.
*/
const request = require('supertest'); // calling it "request" is a common practice

const server = require('./server.js'); // this is our first red, file doesn't exist yet

describe('server.js', () => {
  // http calls made with supertest return promises, we can use async/await if desired
  describe('index route', () => {
    it('should return an OK status code from the index route', async () => {
      const expectedStatusCode = 200;

      // do a get request to our api (server.js) and inspect the response
      const response = await request(server).get('/');

      expect(response.status).toEqual(expectedStatusCode);

      // same test using promise .then() instead of async/await
      // let response;
      // return request(server).get('/').then(res => {
      //   response = res;

      //   expect(response.status).toEqual(expectedStatusCode);
      // })
    });

    it('should return a JSON object fron the index route', async () => {
      const expectedBody = { api: 'running' };

      const response = await request(server).get('/');

      expect(response.body).toEqual(expectedBody);
    });

    it('should return a JSON object fron the index route', async () => {
      const response = await request(server).get('/');

      expect(response.type).toEqual('application/json');
    });
  });
});