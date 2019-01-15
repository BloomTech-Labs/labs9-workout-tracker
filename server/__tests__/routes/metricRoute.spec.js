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

/////Metrics Tests Below
//api/progress/metrics/all

describe('metricAll', () => {
  describe('/api/progress/metrics/all', () => {

    it ('should return status code 200', async () => {
      const expected = 200;
      const res = await request(server).get('/api/progress/metrics/all').set(headers);
      expect(res.status).toEqual(expected);
    })

    it ('should return something went wrong', async () => {
      const res = await request(server).get('/api/progress/metrics/all').set(headers);
      expect(res.type).toEqual('application/json')
    }) 
  })
})

/////testing metric by id
////api/progress/metrics/get/:id

// describe('metricById', () => {
//   describe('/api/progress/metrics/get/:id', () => {
//     it ('should return GET metric by id', async () => {
//       const metricId = 0;
//       const res = await request(server).get(`/api/progress/metrics/${metricId}`).set(headers);
//       expect(res).toEqual({ leg_left:8.165567216506876 })
//     } )
//   })
// })
